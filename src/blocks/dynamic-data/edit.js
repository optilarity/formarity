import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
	ResponsiveWrapper,
} from '@wordpress/components';

export const Edit = ( { attributes, setAttributes } ) => {
	const { dataKey, renderType, tagName, placeholder } = attributes;
	const blockProps = useBlockProps( {
		className: `formello-dynamic-data type-${ renderType }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Dynamic Data Settings', 'formello' ) }>
					<TextControl
						label={ __( 'Data Key', 'formello' ) }
						value={ dataKey }
						onChange={ ( val ) => setAttributes( { dataKey: val } ) }
						help={ __(
							'The key to bind to (e.g. product_title, price). Must match the key sent from the trigger button.',
							'formello'
						) }
					/>
					<SelectControl
						label={ __( 'Render Type', 'formello' ) }
						value={ renderType }
						options={ [
							{ label: 'Text', value: 'text' },
							{ label: 'Image', value: 'image' },
						] }
						onChange={ ( val ) =>
							setAttributes( { renderType: val } )
						}
					/>
					{ renderType === 'text' && (
						<SelectControl
							label={ __( 'HTML Tag', 'formello' ) }
							value={ tagName }
							options={ [
								{ label: 'Span', value: 'span' },
								{ label: 'Div', value: 'div' },
								{ label: 'Paragraph (p)', value: 'p' },
								{ label: 'Heading 1 (h1)', value: 'h1' },
								{ label: 'Heading 2 (h2)', value: 'h2' },
								{ label: 'Heading 3 (h3)', value: 'h3' },
								{ label: 'Heading 4 (h4)', value: 'h4' },
								{ label: 'Heading 5 (h5)', value: 'h5' },
								{ label: 'Heading 6 (h6)', value: 'h6' },
							] }
							onChange={ ( val ) =>
								setAttributes( { tagName: val } )
							}
						/>
					) }
					
					{ renderType === 'image' ? (
						<div className="formello-image-placeholder-settings">
							<label className="components-base-control__label">
								{ __( 'Placeholder Image', 'formello' ) }
							</label>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( { placeholder: media.url } )
									}
									allowedTypes={ [ 'image' ] }
									value={ placeholder }
									render={ ( { open } ) => (
										<Button
											className={
												! placeholder
													? 'editor-post-featured-image__toggle'
													: 'editor-post-featured-image__preview'
											}
											onClick={ open }
										>
											{ ! placeholder &&
												__( 'Choose an image', 'formello' ) }
											{ !! placeholder && (
												<ResponsiveWrapper
													naturalWidth={ 200 }
													naturalHeight={ 150 }
												>
													<img
														src={ placeholder }
														alt={ __(
															'Placeholder',
															'formello'
														) }
													/>
												</ResponsiveWrapper>
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ !! placeholder && (
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( { placeholder: media.url } )
										}
										allowedTypes={ [ 'image' ] }
										value={ placeholder }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
												variant="secondary"
												isLarge
												style={ { marginTop: '8px', width: '100%' } }
											>
												{ __( 'Replace Image', 'formello' ) }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							) }
							{ !! placeholder && (
								<Button
									onClick={ () =>
										setAttributes( { placeholder: '' } )
									}
									isLink
									isDestructive
									style={ { marginTop: '8px', display: 'block' } }
								>
									{ __( 'Remove Image', 'formello' ) }
								</Button>
							) }
							<p className="components-base-control__help">
								{ __( 'Image to show before dynamic data loads.', 'formello' ) }
							</p>
						</div>
					) : (
						<TextControl
							label={ __( 'Placeholder Text', 'formello' ) }
							value={ placeholder }
							onChange={ ( val ) =>
								setAttributes( { placeholder: val } )
							}
							help={ __(
								'Text to show in editor and before data loads.',
								'formello'
							) }
						/>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ renderType === 'image' ? (
					<div className="formello-dynamic-image-wrapper">
						{ placeholder ? (
							<img
								src={ placeholder }
								alt={ dataKey || 'Dynamic Image' }
								style={ { maxWidth: '100%', height: 'auto' } }
							/>
						) : (
							<div className="components-placeholder is-large">
								<div className="components-placeholder__label">
									{ __( 'Dynamic Image', 'formello' ) }
								</div>
								<div className="components-placeholder__fieldset">
									{ __( 'Select a placeholder image in the sidebar settings.', 'formello' ) }
								</div>
							</div>
						) }
					</div>
				) : (
					<RichText
						tagName={ tagName }
						value={ placeholder }
						onChange={ ( val ) =>
							setAttributes( { placeholder: val } )
						}
						placeholder={ __( 'Dynamic Text...', 'formello' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
				) }
				{ ! dataKey && (
					<div
						className="formello-warning"
						style={ {
							fontSize: '10px',
							color: '#cc1818',
							marginTop: '4px',
							fontStyle: 'italic',
						} }
					>
						{ __( 'Missing Data Key', 'formello' ) }
					</div>
				) }
			</div>
		</>
	);
};
