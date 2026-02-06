import PropTypes from 'prop-types';

const Title = ({children, subtitle}) => {
    return(
        <div className="w-full rounded-t-md overflow-hidden mb-5 ">
            <h1 className="text-center
            md:text-3xl sm:text-2xl text-xl text-text-secondary py-3">{children}</h1>
            {subtitle && <h4 className="text-lg text-center text-text-muted">{subtitle}</h4>}
        </div>
    )
}

Title.propTypes = {
  children: PropTypes.node,
  subtitle: PropTypes.node
};

export default Title;