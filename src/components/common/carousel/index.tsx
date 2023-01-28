import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SimpleSlider = () => {
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };

  return (
    <div
      style={{
        margin: "0 auto",
        width: "1240px",
        height: "400px",
      }}
    >
      <Slider {...settings}>
        <div>
          <h3>
            <img
              src="//cdn.011st.com/11dims/resize/1240x400/quality/99/11src/browsing/banner/2022/09/28/33033/2022092815352814705_12458066_1.jpg"
              alt=""
            />
          </h3>
        </div>
        <div>
          <h3>
            <img src="//cdn.011st.com/11dims/resize/1240x400/quality/99/11src/browsing/banner/2022/09/23/33033/202209231146235421_12449337_1.jpg" />
          </h3>
        </div>
        <div>
          <h3>
            <img src="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/browsing/banner/2022/09/27/33033/2022092711312745683_12456206_1.jpg" />
          </h3>
        </div>
        <div>
          <h3>
            <img src="https://cdn.011st.com/11dims/resize/1240x400/quality/99/11src/browsing/banner/2022/09/23/33033/2022092313142322756_12449369_1.jpg" />
          </h3>
        </div>
      </Slider>
    </div>
  );
};

export default SimpleSlider;
