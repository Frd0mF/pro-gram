import PropTypes from 'prop-types'

export  default function Footer({caption}) {
    return (
        <div className="flex py-4 p-2 text-icon">
            <p>{caption}</p>
        </div>
    )
}

Footer.propTypes = {
    caption : PropTypes.string.isRequired,
}