import { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import MoviesShowing from "./MoviesShowing";
import request from "../../redux/axios-config";
import {useSelector} from "react-redux";


function SeeMovieDetails() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState(null);
  const user = useSelector(state => state.user.user)

  const { id } = useParams();
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        if (id) {
          const response = await request.get(
            `/movie/private/find/${id}`
          );
          setMovie(response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  const actors = movie?.actor
    ? movie.actor.split(",").map((actor) => actor.trim())
    : [];

  return (
    <>
      <div className="book__ticket__wrapper">
        <div className="relative bg-black flex justify-center w-full h-full ">
          <div className="absolute w-full h-full  bg-[#0003]"></div>
          <div className="relative h-full overflow-hidden">
            <div className="absolute top-0 -left-[0%] z-100">
              <img
                alt="Blur Left"
                className="w-full lg:h-[500px] object-cover lg:block hidden"
                src="https://www.galaxycine.vn/_next/static/media/blur-left.7a4f1851.png"
              />
            </div>
            <img
              alt="Img Movie"
              src={movie?.poster}
              className='w-[860px] h-full md:h-full lg:h-[500px] duration-500 ease-in-out group-hover:opacity-100"
              scale-100 blur-0'
            />
            <div className="absolute top-0 -right-[0%] z-100 lg:block hidden">
              <img
                className="w-full lg:h-[500px] object-cover lg:block hidden"
                src="https://www.galaxycine.vn/_next/static/media/blur-right.52fdcf99.png"
              />
            </div>
            <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[600] rounded-full p-2"
              onClick={openModal}
              aria-label="Play Trailer"
            >
              <img
                alt="play"
                className="w-[40px] h-[40px] lg:w-[64px] lg:h-[64px] object-cover duration-500 ease-in-out group-hover:opacity-100 scale-100 blur-0 grayscale-0"
                src="https://www.galaxycine.vn/_next/static/media/button-play.2f9c0030.png"
                style={{ color: "transparent" }}
              />
            </button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={closeModal}
          styles={{
            modal: {
              minWidth: "400px",
              maxWidth: "90vw",
              width: "100%",
              borderRadius: "4px",
              backgroundColor: "transparent",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <div className="trailer__wrapper  h-[80vh]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={movie?.trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen"
            ></iframe>
          </div>
        </Modal>

        <div className="grid grid-cols-1 screen1200:grid-cols-7 my-0 mx-auto screen1390:max-w-screen-xl xl:max-w-screen-screen1200 lg:max-w-4xl md:max-w-4xl gap-8 py-7 md:px-4 px-4">
          <div className="book__left lg:col-span-5 w-full ">
            <div className="book__film flex flex-col">
              <div className="movie__info relative md:grid hidden grid-cols-3 md:gap-5 gap-3 lg:items-end ">
                <div className="movie__thumbnail lg:-translate-y-20 md:-translate-y-16 -translate-y-0 col-span-1 drop-shadow-2xl z-[500]">
                  <img
                    alt="Deadpool &amp; Wolverine"
                    className='border-2 rounded border-white lg:w-[320px] lg:h-[400px] w-full h-full duration-500 ease-in-out group-hover:opacity-100"
                        scale-100 blur-0 grayscale-0'
                    src={movie?.avatar}
                    style={{ color: "transparent" }}
                  />
                </div>
                <div className="col-span-2 lg:-translate-y-20 flex flex-col justify-end md:-translate-y-12 -translate-y-0 mb-3 gap-5">
                  <div className="item__title flex items-center">
                    <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                      {movie?.nameMovie}
                    </h1>
                  </div>
                  <div className="flex items-center">
                    <div className="text-sm flex items-center font-semibold not-italic">
                      <FaClock
                        className="inline-block align-baseline mr-1"
                        size={14}
                        color="#F58020"
                      />
                      <span>{movie?.durationMovie} Phút</span>
                    </div>
                    <div className="text-sm ml-4 flex items-center font-semibold not-italic">
                      <FaCalendarAlt
                        className="inline-block align-baseline mr-1"
                        size={12}
                        color="#F58020"
                      />
                      <span>{movie?.releaseDate}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-nowrap items-center  text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                        Nhà sản xuất:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        <li className="text-sm cursor-pointer hover:text-primary transition duration-500 ease-in-out">
                          <span className="mr-[1px]">{movie?.studio}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-nowrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                        Thể loại:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        {movie?.kindOfFilm.map((genre, index) => (
                          <li key={index} className="inline-block">
                            <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                              {genre.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-nowrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                        Đạo diễn:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        <li className="inline-block">
                          <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                            {movie?.director}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-nowrap  items-center text-sm">
                      <span className="inline-block h-8 mt-2 py-[6px] text-grey-40 w-[70px] flex-0">
                        Diễn viên:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        {actors.map((actor, index) => (
                          <li key={index} className="inline-block">
                            <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                              {actor}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {movie?.statusFilm?.name === "Showing" && user?.role !== "employee" ?(
                        <div className="flex flex-nowrap  items-center text-sm">
                          <button onClick={() => {
                            navigate(`/movie/${id}`)
                          }}
                                  className="py-2 px-5 bg-blue-500 text-dark font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-75 text-white">
                            Đặt vé
                          </button>
                        </div>
                    ):""}

                  </div>
                </div>
              </div>
              <div className="movie__info relative md:hidden grid grid-cols-1 grid-flow-row  lg:items-end ">
                <div className="movie__thumbnail grid grid-cols-3 gap-3 grid-flow-col">
                  <img
                      alt="Deadpool &amp; Wolverine"
                      className='border-2 rounded border-white lg:w-[320px] lg:h-[400px] md:w-full md:h-full w-[120px] h-[160px] col-span-1 object-cover duration-500 ease-in-out group-hover:opacity-100"
                        scale-100 blur-0 grayscale-0'
                    src={movie?.avatar}
                    style={{ color: "transparent" }}
                  />
                  <div className="col-span-2 flex flex-col justify-center">
                    <div className="item__title flex items-center">
                      <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-black-10 mr-4">
                        {movie?.nameMovie}
                      </h1>
                    </div>
                    <div className="flex items-center">
                      <div className="text-sm flex items-center font-semibold not-italic">
                        <FaClock
                          className="inline-block align-baseline mr-1"
                          size={14}
                          color="#F58020"
                        />
                        <span>{movie?.durationMovie} Phút</span>
                      </div>
                      <div className="text-sm ml-4 flex items-center font-semibold not-italic">
                        <FaCalendarAlt
                          className="inline-block align-baseline mr-1"
                          size={12}
                          color="#F58020"
                        />
                        <span>{movie?.releaseDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-nowrap items-center  text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 flex-0">
                        Nhà sản xuất:
                      </span>
                      <ul className="ml-2 flex flex-wrap flex-1">
                        <li className="text-sm cursor-pointer hover:text-primary transition duration-500 ease-in-out">
                          <span className="mr-[5px]">{movie?.studio}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-nowrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                        Thể loại:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        {movie?.kindOfFilm.map((genre, index) => (
                          <li key={index} className="inline-block">
                            <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                              {genre.name}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-nowrap items-center text-sm">
                      <span className="inline-block h-8 py-[6px] text-grey-40 w-[70px] flex-0">
                        Đạo diễn:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        <li className="inline-block">
                          <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                            {movie?.director}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-nowrap  items-center text-sm">
                      <span className="inline-block h-8 mt-2 py-[6px] text-grey-40 w-[70px] flex-0">
                        Diễn viên:
                      </span>
                      <ul className="ml-2 flex flex-wrap gap-1 flex-1">
                        {actors.map((actor, index) => (
                          <li key={index} className="inline-block">
                            <div className="text-black text-sm inline-flex h-8 border border-grey-20 hover:border-primary rounded-lg px-4 py-2 capitalize not-italic items-center">
                              {actor}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="movie__content mt-3 lg:mt-0">
                <span className="border-l-4 border-solid border-blue-500 mr-2"></span>
                <h1 className="mb-4 text-base inline-block capitalize font-bold">
                  Nội dung phim
                </h1>
                <div className="block__wysiwyg text-black-10 text-sm font-normal not-italic content-text content__data__full">
                  <p style={{ textAlign: "justify", marginBottom: "11px" }}>
                    <span style={{ fontSize: "14px" }}>
                      <span
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        <span style={{ lineHeight: "150%" }}>
                          {movie?.content}
                        </span>
                      </span>
                    </span>
                  </p>

                  <p>
                    <span style={{ fontSize: "14px" }}>
                      <span
                        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                      >
                        Phim mới
                        <strong> {movie?.nameMovie}</strong>&nbsp;ra mắt tại các
                        <em> rạp chiếu phim </em>
                        toàn quốc từ {movie?.releaseDate}.
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <MoviesShowing />
        </div>
      </div>
    </>
  );
}

export default SeeMovieDetails;
