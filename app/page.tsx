import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* List of products */}
          <div className="flex flex-col gap-16">
            {/*<ProductsGroupList title="Pizzas" items={[1, 2, 3, 4, 5]} />
            <ProductsGroupList title="Combo" items={[1, 2, 3, 4, 5]} />*/}
            Список товаров
          </div>
        </div>
      </Container>
    </>
  );
}
