import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <PizzaImage size={40} imageUrl={product.imageUrl} className="" />
        <div className="w-[490px] bg-[#f9f6f6] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis molestiae autem illo
            reprehenderit, obcaecati, tenetur beatae provident exercitationem voluptates, quibusdam
            deleniti. Beatae fugit tempore aut debitis nulla amet veniam soluta?
          </p>

          <GroupVariants
            value="2"
            items={[
              {
                name: 'small',
                value: '1',
              },
              {
                name: 'medium',
                value: '2',
              },
              {
                name: 'large',
                value: '3',
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
}
