import {Link} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";


function MoviesShowing() {
  const [showingMovies, setShowingMovies] = useState([]);
  useEffect(() => {
    const fetchShowingMovies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/movie/private/currently-showing`
        );
        setShowingMovies(response.data);
      } catch (error) {
        console.error("Error fetching showing movies:", error);
      }
    };
    fetchShowingMovies();
  }, []);

  return (
    <div className="screen1200:block lg:col-span-2 w-full overflow-hidden">
      <div className="mb-4">
        <span className="border-l-4 border-solid border-blue-500 mr-2"></span>
        <h1 className="text-xl inline-block uppercase font-semibold">
          Phim đang chiếu
        </h1>
      </div>
      <div className="movie__content">
        <ul className="flex flex-col  justify-between">
          {showingMovies.map((showing) => (
            <li
              key={showing.id}
              className="text-sm text-black py-1 transition-all duration-300"
            >
              <div className="inline-block whitespace-nowrap relative max-w-full w-[400px] h-[250px]">
                <div className="inline-block cursor-pointer rounded overflow-hidden card__movies max-w-full false ">
                  <div className="object-cover rounded relative card__img max-w-full">
                    <div className="absolute hidden md:block w-full h-full z-10 cursor-pointer bg-[#00000080] transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
                      <div className="card__hover__content flex flex-col justify-center items-center w-full h-full">
                        <Link
                          to={`/see-movie-details/${showing.id}`}
                          type="button"
                          className="text-white bg-[#f26b38] w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440]"
                        >
                          <img
                            alt="Logo Buy Ticket"
                            width="400"
                            height="250"
                            className="mr-2"
                            src="https://www.galaxycine.vn/_next/static/media/Vector-1.319a0d2b.svg"
                            style={{ color: "transparent" }}
                          />
                          Mua vé
                        </Link>
                      </div>
                    </div>
                    <Link to={`/see-movie-details/${showing.id}`}>
                      <img
                        alt="deadpool--wolverine"
                        className="object-cover w-full h-full duration-500 ease-in-out"
                        src={showing.poster}
                        style={{ color: "transparent" }}
                      />
                    </Link>
                  </div>
                </div>
                <div
                  className="Card_card__title__kFoFc mt-2"
                  style={{ width: "400px" }}
                >
                  <Link
                    to={`/see-movie-details/${showing.id}`}
                    type="button"
                    className="text-sm font-semibold not-italic w-[400px]"
                  >
                    {showing.nameMovie}
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MoviesShowing;
