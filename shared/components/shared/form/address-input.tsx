'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui';
import { ErrorText, ClearButton } from '..';
import { useLoadScript } from '@react-google-maps/api';
import { transformGoogleAddress } from '@/shared/lib';
import { useAddressStore } from '@/shared/store';

interface AddressInputProps {
  name: string;
  idName: string;
  className?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const libraries = ['places'];

export const AddressInput: React.FC<AddressInputProps> = ({
  name,
  idName,
  className,
  onValidationChange,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const setAddress = useAddressStore((store) => store.setAddress);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const addressErrorText = errors[name]?.message as string;
  const addressIdErrorText = errors[idName]?.message as string;

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) return;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(name, inputValue, { shouldValidate: true });

    if (!window.google || !inputValue) {
      setSuggestions([]);
      return;
    }

    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: inputValue, types: ['geocode'] },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          setSuggestions(predictions);
        } else {
          setSuggestions([]);
        }
      },
    );
  };

  const handleSuggestionClick = (placeId: string, description: string) => {
    setValue(name, description, { shouldValidate: true });
    setValue(idName, placeId, { shouldValidate: true });
    setSuggestions([]);

    fetchPlaceDetails(placeId);
  };

  const fetchPlaceDetails = (placeId: string) => {
    const placesService = new google.maps.places.PlacesService(document.createElement('div'));

    placesService.getDetails({ placeId }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && place) {
        const addressComponents = place.address_components;

        const isValid = validateAddressComponents(addressComponents!);

        if (onValidationChange) {
          onValidationChange(isValid);
        }

        if (!isValid) {
          setValue(idName, '', { shouldValidate: true });
        } else {
          if (addressComponents) {
            setAddress(transformGoogleAddress(addressComponents));
          }
        }
      }
    });
  };

  const validateAddressComponents = (components: any[]): boolean => {
    const requiredComponents = [
      'street_number',
      'route',
      'administrative_area_level_1',
      'locality',
      'postal_code',
      'country',
    ];
    const foundComponents = components.map((component) =>
      component.types.find((type: string) => requiredComponents.includes(type)),
    );

    return requiredComponents.every((required) => foundComponents.includes(required));
  };

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
    setValue(idName, '', { shouldValidate: true });
    setSuggestions([]);
  };

  return (
    <div className={className}>
      <div className="relative">
        <Input
          {...register(name)}
          onChange={handleInputChange}
          placeholder="Enter your address"
          className="h-12 text-md"
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 shadow-lg rounded-md mt-1 w-full">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion.place_id, suggestion.description)}
              className="p-2 hover:bg-gray-100 cursor-pointer">
              {suggestion.description}
            </li>
          ))}
        </ul>
      )}

      {addressErrorText && <ErrorText text={addressErrorText} className="mt-2" />}
      {addressIdErrorText && <ErrorText text={addressIdErrorText} className="mt-2" />}
    </div>
  );
};
