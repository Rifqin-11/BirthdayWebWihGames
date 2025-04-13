import Photo1 from "../assets/Book1/Tegar6.jpg";
import Photo2 from "../assets/Book1/Tegar7.jpg";
import Photo3 from "../assets/Book1/Tegar8.jpg";
import Photo4 from "../assets/Book2/Tegar1.jpg";
import Photo5 from "../assets/Book2/Tegar2.jpg";
import Photo6 from "../assets/Book2/Tegar3.jpg";
import Photo7 from "../assets/Book2/Tegar5.jpg";
import Photo8 from "../assets/Book3/Tegar1.jpg";
import Photo9 from "../assets/Book3/Tegar2.jpg";
import Photo10 from "../assets/Book3/Tegar3.jpg";
import Photo11 from "../assets/Book3/Tegar4.jpg";
import Photo12 from "../assets/Book3/Tegar5.jpg";
import Photo13 from "../assets/Book3/Tegar6.jpg";
import Photo14 from "../assets/Book3/Tegar7.jpg";
import Photo15 from "../assets/Book3/Tegar8.jpg";
import Photo16 from "../assets/Book3/Tegar9.jpg";
import Photo17 from "../assets/Book3/Tegar10.jpg";
import Photo18 from "../assets/Book3/Tegar11.jpg";
import Photo19 from "../assets/Book3/Tegar12.jpg";
import Photo20 from "../assets/Book3/Tegar13.jpg";
import Photo21 from "../assets/Book3/Tegar14.jpg";
import Photo22 from "../assets/Book3/Tegar15.jpg";
import Photo23 from "../assets/Book3/Tegar16.jpg";
import Photo24 from "../assets/Book3/Tegar17.jpg";

import Photo25 from "../assets/Book4/Tegar18.jpg";
import Photo26 from "../assets/Book4/Tegar19.jpg";
import Photo27 from "../assets/Book4/Tegar20.jpg";
import Photo28 from "../assets/Book4/Tegar21.jpg";
import Photo29 from "../assets/Book4/Tegar22.jpg";
import Photo30 from "../assets/Book4/Tegar23.jpg";
import Photo31 from "../assets/Book4/Tegar14.jpg";

interface BookPhotos {
  images: string[];
  caption: string;
}

const PhotoData: Record<string, BookPhotos> = {
  book1: {
    images: [Photo1, Photo2, Photo3],
    caption: "eyang's house, denim shorts and tewak tewok 👦🏻🏡🌝",
  },
  book2: {
    images: [Photo4, Photo5, Photo6, Photo7],
    caption:
      "look how far you've come, grown, and GLOW hahahaa 👨🏻‍💼🚀",
  },
  book3: {
    images: [
      Photo8,
      Photo9,
      Photo10,
      Photo11,
      Photo12,
      Photo13,
      Photo14,
      Photo15,
      Photo16,
      Photo17,
      Photo18,
      Photo19,
      Photo20,
      Photo21,
      Photo22,
      Photo23,
      Photo24,
    ],
    caption:
      "happy birthday Tegar🥳 let's keep on growing, dancing, and exploring this world together💃🏻❤‍🔥 stand taller & shine brighter! i am here watching you👀🫵🏼🤣💙🥰",
  },
  book4: {
    images: [Photo25, Photo26, Photo27, Photo28, Photo29, Photo30, Photo31],
    caption:
      "you'll always have us that proud of you in everything 💖😋🤙🏻",
  },
};

export default PhotoData;
