import { useBlockProps, RichText } from '@wordpress/block-editor';

export const Save = ( { attributes } ) => {
	const { dataKey, renderType, tagName, placeholder } = attributes;
	const blockProps = useBlockProps.save( {
		className: `formello-dynamic-data formello-bind-${ dataKey }`,
		'data-formello-bind': dataKey,
	} );

	if ( renderType === 'image' ) {
		return (
			<img
				{ ...blockProps }
				src={ placeholder || '' }
				alt={ dataKey }
			/>
		);
	}

	return (
		<RichText.Content
			{ ...blockProps }
			tagName={ tagName }
			value={ placeholder }
		/>
	);
};
