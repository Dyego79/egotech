import Item from "./Item";

const ItemList = ({ productos }) => {
  return (
    <>
      <section>
        <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 container mx-auto px-5 py-12 gap-3">
          {productos.map((producto) => {
            return <Item key={producto.id} producto={producto} />;
          })}
        </div>
      </section>
    </>
  );
};

export default ItemList;
