import Carousel from "react-bootstrap/Carousel";
import picture1 from "../assets/trip_pictures/picture_1.jpeg";
import picture2 from "../assets/trip_pictures/picture_2.jpeg";
import picture3 from "../assets/trip_pictures/picture_3.jpeg";
import "./Carousel.css";

function MyCarousel() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img src={picture1} alt="Road Trip" />
        <Carousel.Caption>
          <h3>Отримайте незабутні враження</h3>
          <h5>Дивіться наші пропозиції та обирайте хутчіш</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={picture2} alt="Sea Trip" />
        <Carousel.Caption>
          <h3>Іспанія, Португалія, Греція...</h3>
          <h5>Морські курорти чекають на вас</h5>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img src={picture3} alt="Montain Trip" />
        <Carousel.Caption>
          <h3>Захопливі краєвиди гір</h3>
          <h5>Вам точно тут сподобається</h5>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
