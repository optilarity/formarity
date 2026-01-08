import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: `wp-block-formello-message ${attributes.messageType || 'success'} ${attributes.displayType || 'notice'}`,
	});

	if (attributes.displayType === 'modal') {
		return (
			<div
				{...blockProps}
				data-wp-interactive="formello"
				data-wp-context={JSON.stringify({
					successMessage: attributes.text,
					messageType: attributes.messageType,
					displayType: attributes.displayType,
				})}
				data-wp-bind--hidden="!context.response"
			>
				<div className="modal-overlay" data-wp-bind--hidden="!context.response">
					<div className="modal-content">
						<button type="button" className="modal-close" data-wp-on--click="actions.closeModal">×</button>
						<div className="modal-icon">
							{attributes.messageType === 'success' && '✓'}
							{attributes.messageType === 'error' && '✕'}
							{attributes.messageType === 'warning' && '⚠'}
							{attributes.messageType === 'info' && 'ℹ'}
						</div>
						<RichText.Content
							tagName="p"
							value={attributes.text}
							data-wp-text="state.message"
						/>
						<ul data-wp-context="state.errors" data-wp-bind--hidden="context.response.success">
							<template data-wp-each="state.errors">
								<li data-wp-text="context.item"></li>
							</template>
						</ul>
						<button type="button" className="modal-ok" data-wp-on--click="actions.closeModal">
							OK
						</button>
					</div>
				</div>
				<InnerBlocks.Content />
			</div>
		);
	}

	return (
		<div
			{...blockProps}
			data-wp-class--success="context.response.success"
			data-wp-class--error="!context.response.success"
			data-wp-interactive="formello"
			data-wp-context={JSON.stringify({
				successMessage: attributes.text,
				messageType: attributes.messageType,
				displayType: attributes.displayType,
			})}
		>
			<RichText.Content
				tagName="p"
				value={attributes.text}
				data-wp-text="state.message"
			/>
			<ul data-wp-context="state.errors">
				<template data-wp-each="state.errors">
					<li data-wp-text="context.item"></li>
				</template>
			</ul>
			<InnerBlocks.Content />
		</div>
	);
}
