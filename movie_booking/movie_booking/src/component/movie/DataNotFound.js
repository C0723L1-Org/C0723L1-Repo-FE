export const DataNotFound = () => {
  return(
      <div className="flex items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md">
          <svg className="w-6 h-6 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11V7m0 12h.01m-7.707-2.707a1 1 0 010-1.414L5.586 16a1 1 0 011.414 0L12 20.414l4.707-4.707a1 1 0 011.414 0L19.707 17a1 1 0 010 1.414L12 23.414 6.293 17.707z" />
          </svg>
          <span className="font-semibold">Dữ liệu không tồn tại!</span>
      </div>
  )
}