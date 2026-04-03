const Cartwithdifficulty = (Cart) => {
    const Cartwithdifficultylabel = (props) => {
        return (
            <div className="relative inline-block">
                <label className="absolute m-2 top-2 left-2 bg-black text-white px-2 py-1 rounded-full z-10 t">
                    {props?.data?.difficulty}
                </label>
                <Cart {...props} />
            </div>
        )
    }
    return Cartwithdifficultylabel;
}

export default Cartwithdifficulty;