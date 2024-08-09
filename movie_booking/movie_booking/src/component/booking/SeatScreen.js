import './seat.css';

function SeatScreen(){
    const rows = ['A', 'B', 'C', 'D', 'E', 'F','G','H'];
    const seatsPerRow = 12;
    const occupiedSeats = ['C4', 'B5','C6', 'C7', 'C8', 'E4', 'E5', 'F5', 'F6', 'F7'];
    return (
       <>
           <div className="movie-container">
               <label>Movie: </label>
               <span id="movie"> Siêu sao ca nhạc</span>
           </div>

           <ul className="showcase">
               <li>
                   <div className="seat"></div>
                   <small>Available</small>
               </li>
               <li>
                   <div className="seat selected"></div>
                   <small>Selected</small>
               </li>
               <li>
                   <div className="seat occupied"></div>
                   <small>Occupied</small>
               </li>
           </ul>
            {/*in ra danh sách ghế*/}
           <div className="seat-container">
               <div className="screen"></div>
               {rows.map((row) => (
                   <div className="row" key={row}>
                       {Array.from({ length: seatsPerRow }, (_, index) => {
                           const seatNumber = `${row}${index + 1}`;
                           return (
                               <div
                                   className={`seat ${occupiedSeats.includes(seatNumber) ? 'occupied' : ''}`}
                                   key={seatNumber}
                               >
                                   {seatNumber}
                               </div>
                           );
                       })}
                   </div>
               ))}
               <p className="text">
                   Bạn đã chọn <span id="count">0</span> ghế
               </p>
               <div className="flex justify-between items-center w-full mt-5">
                   <div className="w-full  flex justify-center items-center">
                       <button className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                           Quay lại
                       </button>
                   </div>
                   <div className="w-full flex justify-center items-center">
                       <button className="bg-amber-50 hover:bg-amber-200 text-blue-700 font-semibold hover:text-black py-2 px-4 border border-amber-500 hover:border-transparent rounded ">
                           Tiếp theo
                       </button>
                   </div>
               </div>
           </div>
       </>
    )
}
export default SeatScreen;