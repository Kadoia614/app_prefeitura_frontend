const Title = ({children}) => {
    return(
        <div className="w-full rounded-t-md overflow-hidden mb-5 shadow-secondary shadow-md">
            <h1 className="text-center
            md:text-3xl sm:text-2xl text-xl text-primary py-3">{children}</h1>
        </div>
    )
}

export default Title;