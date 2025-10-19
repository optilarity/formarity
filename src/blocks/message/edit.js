import { __ } from '@wordpress/i18n';

import { SelectControl, PanelBody } from '@wordpress/components';
import {
	InspectorControls,
	store as blockEditorStore,
	useInnerBlocksProps,
	useBlockProps,
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';

export default function Edit( { attributes, clientId, setAttributes } ) {
	const blockProps = useBlockProps( {
		className: `${attributes.messageType} ${attributes.displayType}`,
	} );

	const { hasInnerBlocks } = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return {
				hasInnerBlocks: !! ( block && block.innerBlocks.length ),
			};
		},
		[ clientId ]
	);

	const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps, {
		templateLock: false,
		renderAppender: hasInnerBlocks
			? null
			: InnerBlocks.DefaultBlockAppender,
	} );

	const [ formello ] = useEntityProp( 'root', 'site', 'formello' );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Message Settings', 'formello' ) }>
					<SelectControl
						label={ __( 'Display Type', 'formello' ) }
						value={ attributes.displayType }
						options={ [
							{ label: __( 'Notice Message', 'formello' ), value: 'notice' },
							{ label: __( 'Modal Popup', 'formello' ), value: 'modal' },
						] }
						onChange={ ( val ) => setAttributes( { displayType: val } ) }
					/>
					<SelectControl
						label={ __( 'Message Type', 'formello' ) }
						value={ attributes.messageType }
						options={ [
							{ label: __( 'Success', 'formello' ), value: 'success' },
							{ label: __( 'Error', 'formello' ), value: 'error' },
							{ label: __( 'Warning', 'formello' ), value: 'warning' },
							{ label: __( 'Info', 'formello' ), value: 'info' },
						] }
						onChange={ ( val ) => setAttributes( { messageType: val } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps }>
				<RichText
					tagName="p"
					value={ attributes.text }
					onChange={ ( val ) => setAttributes( { text: val } ) }
					placeholder={ formello?.messages.form.success }
				/>
				{ children }
			</div>
		</>
	);
}
