import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	BlockControls,
	InspectorAdvancedControls,
	InnerBlocks,
	RichText,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import {
	SelectControl,
	ToggleControl,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import clsx from 'clsx';
import {
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
} from '../../icons/loading';

const ALIGNMENT_CONTROLS = [
	{
		icon: 'align-left',
		title: __( 'Align Left', 'formello' ),
		align: 'left',
	},
	{
		icon: 'align-center',
		title: __( 'Align Center', 'formello' ),
		align: 'center',
	},
	{
		icon: 'align-right',
		title: __( 'Align Right', 'formello' ),
		align: 'right',
	},
	{
		icon: 'align-wide',
		title: __( 'Wide', 'formello' ),
		align: 'wide',
	},
];

const ALLOWED_BLOCKS = [ 'jankx/icon-picker', 'jankx/svg-icon', 'core/image' ];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { type, alignment, noWrapper, iconPosition = 'left' } = attributes;

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

	const [ showIcon, setShowIcon ] = useState( false );

	// not already merged in Gutenberg
	// const spacingProps = useSpacingProps( attributes );

	const colorProps = useColorProps( attributes );
	const borderProps = useBorderProps( attributes );

	const buttonClasses = clsx(
		'wp-element-button',
		borderProps.className,
		colorProps.className,
		{
			'wp-block-formello-button--loading': showIcon,
			[ `icon-position-${ iconPosition }` ]: true,
		}
	);

	const blockProps = useBlockProps( {
		className: alignment,
	} );

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlockCount } = select( 'core/block-editor' );
			return getBlockCount( clientId ) > 0;
		},
		[ clientId ]
	);
	const { insertBlocks, replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	return (
		<div { ...blockProps }>
			<button className={ buttonClasses } style={ colorProps.style }>
				{ ! noWrapper && (
					<BlockControls>
						<ToolbarGroup>
							<ToolbarDropdownMenu
								icon={ 'align-' + alignment }
								label={ __( 'Align' ) }
								controls={ ALIGNMENT_CONTROLS.map(
									( control ) => {
										const { align } = control;
										const isActive = align === alignment;

										return {
											...control,
											isActive,
											onClick: () =>
												setAttributes( {
													alignment: align,
												} ),
										};
									}
								) }
							/>
						</ToolbarGroup>
						<ToolbarGroup>
							<ToolbarDropdownMenu
								icon={ 'admin-customizer' }
								label={ __( 'Icon', 'formello' ) }
								controls={ [
									{
										title: __( 'Thêm Icon Picker', 'formello' ),
										onClick: () => insertBlocks( createBlock( 'jankx/icon-picker' ), undefined, clientId ),
									},
									{
										title: __( 'Thêm SVG Icon', 'formello' ),
										onClick: () => insertBlocks( createBlock( 'jankx/svg-icon' ), undefined, clientId ),
									},
									{
										title: __( 'Thêm Image', 'formello' ),
										onClick: () => insertBlocks( createBlock( 'core/image' ), undefined, clientId ),
									},
									{
										title: __( 'Xoá icon', 'formello' ),
										onClick: () => replaceInnerBlocks( clientId, [] ),
									},
								] }
							/>
						</ToolbarGroup>
					</BlockControls>
				) }
				<InspectorAdvancedControls>
					<ToggleControl
						label={ __( 'Preview Icon', 'formello' ) }
						checked={ showIcon }
						onChange={ ( val ) => {
							setShowIcon( val );
						} }
					/>
					<SelectControl
						label={ __( 'Icon type', 'formello' ) }
						value={ attributes.type }
						options={ Object.keys( icons ).map( ( icon ) => {
							return { label: icon, value: icon };
						} ) }
						onChange={ ( val ) => {
							setAttributes( { type: val } );
						} }
					/>
					{ hasInnerBlocks && (
						<SelectControl
							label={ __( 'Icon position', 'formello' ) }
							value={ iconPosition }
							options={ [
								{ label: __( 'Left', 'formello' ), value: 'left' },
								{ label: __( 'Right', 'formello' ), value: 'right' },
								{ label: __( 'Top', 'formello' ), value: 'top' },
								{ label: __( 'Bottom', 'formello' ), value: 'bottom' },
							] }
							onChange={ ( val ) => setAttributes( { iconPosition: val } ) }
						/>
					) }
				</InspectorAdvancedControls>
				<span className="button-icon-wrapper">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ [] }
						templateLock={ false }
						renderAppender={ false }
						orientation="horizontal"
					/>
				</span>
				<RichText
					tagName="span"
					className="button-text"
					value={ attributes.text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ __( 'Enter button text…', 'formello' ) }
					allowedFormats={ [ 'core/bold' ] }
				/>
				<ButtonIcon />
			</button>
		</div>
	);
}
