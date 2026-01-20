import PropTypes from 'prop-types';

const Title = ({children}) => {
    return(
        <div className="w-full rounded-t-md overflow-hidden mb-5 ">
            <h1 className="text-center
            md:text-3xl sm:text-2xl text-xl text-text-secondary py-3">{children}</h1>
        </div>
    )
}

Title.propTypes = {
  children: PropTypes.any,
};

export default Title;