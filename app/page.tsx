import {
  Container,
  Filters,
  ProductCard,
  ProductsGroupList,
  Title,
  TopBar,
} from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* List of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title="Pizzas"
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 2,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 3,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 4,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 5,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 6,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 7,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />
              <ProductsGroupList
                title="Breakfests"
                categoryId={2}
                items={[
                  {
                    id: 8,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 9,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 10,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 11,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 12,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 13,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                  {
                    id: 14,
                    name: 'Чизбургер пицца',
                    imageUrl:
                      'https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif ',
                    price: 550,
                    items: [{ price: 550 }],
                  },
                ]}
              />
              {/*<ProductsGroupList title="Combo" items={[1, 2, 3, 4, 5]} />*/}
              {/*<ProductCard
              id={0}
              name="Чизбургер-пицца"
              price={550}
              imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.avif"
            />*/}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
