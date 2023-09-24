function DarkModeButton() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 mb-[8rem]">
      <span>다크모드</span>
      <label className="relative inline-flex items-center">
        <input type="checkbox" value="" className="sr-only peer" />
        <div
          className="w-16 h-8 bg-black rounded-full peer
         dark:bg-gray-700 peer-checked:after:translate-x-8
          after:content-['']
           after:absolute after:top-[7px] after:left-[5px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
            after:w-5 after:transition-all dark:border-gray-600 "
        ></div>
      </label>
    </div>
  );
}

export default DarkModeButton;
