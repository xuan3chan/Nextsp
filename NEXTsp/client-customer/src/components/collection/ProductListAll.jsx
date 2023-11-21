import React from "react";
import "../../assets/css/collection.css";
import axios from "axios";
import FilterButtonSection from "./FilterButtonSection";
import "../../assets/css/main.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Paginnation from "./Paginnation";

function ProductListAll(props) {
  const [products, setProducts] = React.useState([]);
  const [pageIndex, setPageIndex] = React.useState(1); // Initial page index
  const itemsPerPage = 10;

  const param = useParams();
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:3101/api/products/getall"
      );
      setProducts(result.data.products);
    };

    fetchData();
  }, []);

  // Function to handle page change
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  function formatPrice(price) {
    if (price) {
      return `${price.toLocaleString()}đ`;
    }
    return "Not Available "; // You can change this message to your preferred text
  }
  const generateStarIcons = (rating) => {
    const starIcons = [];
    for (let i = 0; i < 5; i++) {
      starIcons.push(
        <img
          key={i}
          src="https://static.vecteezy.com/system/resources/previews/013/743/605/original/golden-star-icon-png.png"
          alt=""
          className="w-6 h-6"
        />
      );
    }
    return starIcons;
  };
  return (
    <div className="productList max-h-full w-full bg-white rounded-md pb-8">
      <h1 className="CategoryTitle">Tất Cả Sản Phẩm</h1>
      <FilterButtonSection />
      <div className="flex flex-wrap gap-1 content-center justify-center pt-12 pb-4">
        {products
          .slice((pageIndex - 1) * itemsPerPage, pageIndex * itemsPerPage)
          .map((product, index) => (
            <Link
              to={`/products/${product.id}`}
              key={index}
              className="productItem flex flex-col border-black-500/100 p-4 gap-1"
            >
              <div className="product_image w-72 h-52 object-contain">
                <img
                  src={product.images[0]}
                  alt=""
                  className="w-full h-44 object-contain"
                />
              </div>
              <div className="product_title">
                <h1 className="">{product.nameProduct} </h1>
              </div>
              <div>
                <p className="product_oldPrice font-bold RobotoViet">
                  {formatPrice(product.oldprice)}
                </p>
                <p className="product_price font-normal RobotoViet">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="product_rating flex gap-1 items-center">
                {generateStarIcons(product.rating)}
                <p className="text-xs">(5 đánh giá)</p>
              </div>
              <div className="over-button flex gap-4 items-center justify-center mt-3">
                <div className="btn p-1 flex justify-center btn-sell">
                  Mua Ngay
                </div>
                <div className="btn p-1 flex justify-center btn-addCart">
                  Thêm Vào Giỏ
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Paginnation
        pageIndex={pageIndex}
        pageCount={Math.ceil(products.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
export default ProductListAll;
