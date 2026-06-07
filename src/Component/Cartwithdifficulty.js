const Cartwithdifficulty = (Cart) => {
  const Cartwithdifficultylabel = (props) => {
    const difficulty = props?.data?.difficulty;
    const tone =
      difficulty === "Easy"
        ? "bg-emerald-500"
        : difficulty === "Medium"
        ? "bg-amber-500"
        : "bg-rose-500";
    return (
      <div className="relative h-full">
        {difficulty && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow ${tone}`}
          >
            {difficulty}
          </span>
        )}
        <Cart {...props} />
      </div>
    );
  };
  return Cartwithdifficultylabel;
};

export default Cartwithdifficulty;
