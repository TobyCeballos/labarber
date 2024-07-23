import { useEffect, useState } from "react";
import backgroundImage from "./assets/bg.jpeg";
import Marquee from "react-fast-marquee";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa6";
import { PiStarFourFill } from "react-icons/pi";

const isOpen = () => {
  const now = new Date();
  const day = now.getDay(); // 0 (Domingo) a 6 (Sábado)
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Definir los horarios de apertura y cierre
  const openingHours = [
    { start: [9, 30], end: [12, 0] },
    { start: [16, 30], end: [20, 0] },
  ];

  // La barbería está abierta de lunes a sábado
  if (day === 0) return false; // Domingo cerrado
  if (day > 6) return false; // Días fuera de rango

  // Verificar los horarios de apertura
  for (const { start, end } of openingHours) {
    const startHour = start[0];
    const startMinute = start[1];
    const endHour = end[0];
    const endMinute = end[1];

    if (
      (hour > startHour || (hour === startHour && minute >= startMinute)) &&
      (hour < endHour || (hour === endHour && minute <= endMinute))
    ) {
      return true;
    }
  }

  return false;
};

function App() {
  const currentYear = new Date().getFullYear();
  const [scrollY, setScrollY] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [open, setOpen] = useState(isOpen());

  const haircuts = [
    { title: "Volumen" },
    { title: "Fade" },
    { title: "Undercut" },
    { title: "Taper Fade" },
    { title: "Textura" },
    { title: "Corte Recto" },
    { title: "Curly Fade" },
    { title: "Corte César" },
    { title: "Pompadour" },
    { title: "Quiff" },
    { title: "Hair Tattoo" },
    { title: "Afeitado Clásico" },
    { title: "Recorte de Barba" },
    { title: "Mascarilla Facial" },
    { title: "Tratamiento Capilar" },
    { title: "Coloración" },
    { title: "Alisado" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setOpen(isOpen());
    }, 60000); // Actualiza el estado cada minuto

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      console.log(window.scrollY);
      // Ajusta 200 a la posición deseada donde quieres que la marca se fije
      if (window.scrollY >= 600) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Función para calcular el ángulo de rotación basado en el scroll
  const calculateRotation = (scrollY, factor) => {
    return Math.max(0, 3 - (scrollY / 100) * factor); // Ajusta el factor para controlar la velocidad del enderezado
  };

  return (
    <div className="font-sans bg-white text-black overflow-x-hidden">
      <nav className="bg-gray-200 fixed z-50 w-full p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-black">
            LA BARBER
          </a>
          <div>
            <a href="#home" className="ml-4 font-bold text-gray-700">
              Inicio
            </a>
            <a href="#novedades" className="ml-4 font-bold text-gray-700">
              Información
            </a>
            <a href="#galeria" className="ml-4 font-bold text-gray-700">
              Galería
            </a>
            <a
              href="#contacto"
              className="ml-4 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 font-bold text-white rounded-lg"
            >
              Contacto
            </a>
          </div>
        </div>
      </nav>

      <section
        id="home"
        className="text-center h-[70vh] flex justify-center items-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          color: "white",
          opacity: "0.7",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 text-white  text-shadow-lg">
            LA BARBER
          </h1>
          <p className="text-lg font-semibold text-gray-100  text-shadow-lg">
            La mejor experiencia en cortes, estilos y tintura.
          </p>
          <div className="flex justify-center z-50 transform translate-y-40">
            <a href="#" className="mx-2">
              <FaInstagram className="text-4xl hover:text-cyan-800" />{" "}
            </a>
            <a href="#" className="mx-2">
              <FaFacebook className="text-4xl hover:text-cyan-800" />{" "}
            </a>
            <a href="#" className="mx-2">
              <FaWhatsapp className="text-4xl hover:text-cyan-800" />{" "}
            </a>
          </div>
        </div>
      </section>
      <div className="relative scale-[1.1]">
        <Marquee
          className={`absolute z-40 font-bold text-2xl flex items-center py-3 shadow-lg text-white  ${
            isFixed ? "fixed left-0 w-full bg-gray-900" : ""
          }`}
          style={{
            transform: `rotate(${calculateRotation(scrollY, 0.5)}deg)`,
            backgroundColor: "#027b9c",
          }}
          autoFill
          pauseOnHover
          speed={20}
          gradient
          gradientWidth={400}
          gradientColor={"#033442"}
        >
          {haircuts.map((haircut, index) => (
            <div key={index} className="flex justify-center items-center">
              <PiStarFourFill />
              <h2 className="mx-2 uppercase">{haircut.title}</h2>
            </div>
          ))}
        </Marquee>
        <Marquee
          className="absolute z-30 font-bold text-2xl flex items-center py-3 shadow-lg text-white"
          style={{
            transform: `rotate(-${calculateRotation(scrollY, 0.5)}deg)`,
            top: "-4px",
            backgroundColor: "#027b9c",
          }}
          autoFill
          pauseOnHover
          direction="right"
          speed={25}
          gradient
          gradientWidth={400}
          gradientColor={"#033442"}
        >
          {haircuts.map((haircut, index) => (
            <div key={index} className="flex justify-center items-center">
              <PiStarFourFill />
              <h2 className="mx-2 uppercase">{haircut.title}</h2>
            </div>
          ))}
        </Marquee>
      </div><section id="novedades" className="bg-white py-40">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-8 text-black">Información</h2>
    <div className="p-8 rounded-xl shadow-md inline-block">
      <h3 className="text-2xl font-semibold text-gray-900 mb-1">Horarios de Atención</h3>
      <div>
        <h4 className="mb-3">
          (Actualmente:{" "}
          <span
            className={`inline-block text-white font-semibold rounded-full ${
              open ? "text-cyan-400" : "text-rose-500"
            }`}
          >
            {open ? "Abierto" : "Cerrado"}
          </span>
          )
        </h4>
      </div>
      <p className="text-lg text-gray-700">
        <span className="font-medium">Lunes a Sábados:</span> 9:30 a 12:00hs y 16:30 a 20:00hs
      </p>
      <p className="text-lg text-gray-700 mt-4">
        <span className="font-medium">Dirección:</span> Balcarce, Calle 16 e/ 25 y 27 Nº893
      </p>
    </div>
    {/* Añadir novedades aquí */}
  </div>
</section>

      <section id="galeria" className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Galería</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            <div className="relative bg-white shadow-lg">
              <img src="https://via.placeholder.com/500x400" alt="Estilo 1" />
              <h3 className="absolute bottom-0 w-full text-xl font-bold mb-2 text-black">
                Estilo 1
              </h3>
            </div>
            <div className="relative bg-white shadow-lg">
              <img src="https://via.placeholder.com/500x400" alt="Estilo 1" />
              <h3 className="absolute bottom-0 w-full text-xl font-bold mb-2 text-black">
                Estilo 1
              </h3>
            </div>
            <div className="relative bg-white shadow-lg">
              <img src="https://via.placeholder.com/500x400" alt="Estilo 1" />
              <h3 className="absolute bottom-0 w-full text-xl font-bold mb-2 text-black">
                Estilo 1
              </h3>
            </div>
            <div className="relative bg-white shadow-lg">
              <img src="https://via.placeholder.com/500x400" alt="Estilo 1" />
              <h3 className="absolute bottom-0 w-full text-xl font-bold mb-2 text-black">
                Estilo 1
              </h3>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-black">Contacto</h2>
          <p className="mb-8 text-gray-700">
            Llena el formulario y un miembro de nuestro equipo se pondrá en
            contacto contigo.
          </p>
          <form className="w-full max-w-md mx-auto">
            <div className="mb-4">
              <input
                className="w-full p-4 rounded-lg bg-gray-100 placeholder-gray-500"
                type="text"
                placeholder="Nombre"
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="w-full p-4 rounded-lg bg-gray-100 placeholder-gray-500"
                type="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-4 rounded-lg bg-gray-100 placeholder-gray-500"
                placeholder="Mensaje"
                rows="4"
                required
              ></textarea>
            </div>
            <button className="w-full p-4 bg-cyan-700 hover:bg-cyan-800 rounded-lg font-bold text-white transition">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-200 py-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-700">
            &copy; {currentYear} La Barber. Todos los derechos reservados.
          </p>
          <div className="flex justify-center z-50 pt-8">
            <a href="#" className="mx-2">
              <FaInstagram className="text-2xl hover:text-cyan-800" />{" "}
            </a>
            <a href="#" className="mx-2">
              <FaFacebook className="text-2xl hover:text-cyan-800" />{" "}
            </a>
            <a href="#" className="mx-2">
              <FaWhatsapp className="text-2xl hover:bg-cyan-800" />{" "}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
