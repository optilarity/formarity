import classnames from 'classnames';
import {
	useBlockProps,
	RichText,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';
import {
	Loading,
	Loading2,
	Loading3,
	Loading4,
	Loading5,
	Pulse,
	LoadingCircles,
	LoadingCirclePath,
	Audio,
	BallTriangle,
	Bars,
	Circles,
	Grid,
	ThreeDots,
} from '../../icons/loading';

const v2 = {
	save( { attributes } ) {
		const { text, alignment, type, style } = attributes;

		const icons = {
			Loading,
			Loading2,
			Pulse,
			Loading4,
			LoadingCircles,
			LoadingCirclePath,
			Audio,
			BallTriangle,
			Bars,
			Circles,
			Grid,
			ThreeDots,
		};

		const ButtonIcon = icons[ type ];
		const borderRadius = style?.border?.radius;
		const borderProps = getBorderClassesAndStyles( attributes );

		// Check for old deprecated numerical border radius. Done as a separate
		// check so that a borderRadius style won't overwrite the longhand
		// per-corner styles.
		if ( typeof borderRadius === 'number' ) {
			borderProps.style.borderRadius = `${ borderRadius }px`;
		}

		const colorProps = getColorClassesAndStyles( attributes );

		const buttonClasses = classnames(
			'wp-element-button',
			borderProps.className,
			colorProps.className,
			alignment
		);

		const blockProps = useBlockProps.save( {
			className: buttonClasses,
			style: colorProps.style,
		} );

		return (
			<button type="submit" { ...blockProps }>
				<RichText.Content tagName="span" value={ text } />
				<ButtonIcon />
			</button>
		);
	},
};

const v1 = {
	attributes: {
		text: {
			type: 'string',
			default: 'Submit',
		},
		type: {
			type: 'string',
			default: 'Loading',
		},
		alignment: {
			type: 'string',
			default: 'left',
		},
		style: {
			type: 'object',
			default: {
				color: {
					background: '#000000',
					text: '#ffffff',
				},
				padding: {
					top: '10',
				},
			},
		},
	},
	save( { attributes } ) {
		const { text, alignment, type, style } = attributes;

		const icons = {
			Loading,
			Loading2,
			Loading3,
			Loading4,
			Loading5,
		};

		const ButtonIcon = icons[ type ];
		const borderRadius = style?.border?.radius;
		const borderProps = getBorderClassesAndStyles( attributes );

		// Check for old deprecated numerical border radius. Done as a separate
		// check so that a borderRadius style won't overwrite the longhand
		// per-corner styles.
		if ( typeof borderRadius === 'number' ) {
			borderProps.style.borderRadius = `${ borderRadius }px`;
		}

		const colorProps = getColorClassesAndStyles( attributes );

		const buttonClasses = classnames( colorProps.className, alignment );

		const blockProps = useBlockProps.save( {
			className: buttonClasses,
			style: colorProps.style,
		} );

		return (
			<button type="submit" { ...blockProps }>
				<RichText.Content tagName="span" value={ text } />
				<ButtonIcon />
			</button>
		);
	},
};

// v3 - with svg icon and wrapper
const v3 = {
	save( { attributes } ) {
		const { text, alignment, type, noWrapper } = attributes;

		const icons = {
			Loading,
			Loading2,
			Pulse,
			Loading4,
			LoadingCircles,
			LoadingCirclePath,
			Audio,
			BallTriangle,
			Bars,
			Circles,
			Grid,
			ThreeDots,
		};

		const ButtonIcon = icons[ type ];

		const borderProps = getBorderClassesAndStyles( attributes );
		const colorProps = getColorClassesAndStyles( attributes );

		const buttonClasses = classnames(
			'wp-element-button',
			borderProps.className,
			colorProps.className
		);

		if ( noWrapper ) {
			return (
				<button
					type="submit"
					{ ...useBlockProps.save( {
						className: buttonClasses,
						style: colorProps.style,
					} ) }
				>
					<RichText.Content tagName="span" value={ text } />
					<ButtonIcon />
				</button>
			);
		}

		return (
			<div
				{ ...useBlockProps.save( {
					className: alignment,
				} ) }
			>
				<button
					type="submit"
					className={ buttonClasses }
					style={ colorProps.style }
				>
					<RichText.Content tagName="span" value={ text } />
					<ButtonIcon />
				</button>
			</div>
		);
	},
};

const deprecated = [ v3, v2, v1 ];

export default deprecated;
