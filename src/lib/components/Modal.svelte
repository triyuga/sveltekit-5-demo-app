<!-- src/lib/Modal.svelte -->
<script lang="ts">
	import type { Snippet } from 'svelte'

	interface ModalProps {
		// open: boolean
		closeModal: () => void
		children: Snippet // https://svelte-5-preview.vercel.app/docs/snippets
	}

	// export let open = false
	// export let closeModal: () => void

	const { closeModal, children }: ModalProps = $props()

	let dialogElement: HTMLDialogElement

	function handleBackdropClick(event: MouseEvent) {
		// if (event.target === dialogElement) {
		closeModal()
		// }
	}

	// onMount(() => {
	// 	if (open) {
	// 		dialogElement.showModal()
	// 	}
	// })

	// $effect(() => {
	// 	if (open) {
	// 		dialogElement.showModal()
	// 	} else {
	// 		dialogElement.close()
	// 	}
	// })

	// $: if (dialogElement) {
	// 	if (open) {
	// 		dialogElement.showModal()
	// 	} else {
	// 		dialogElement.close()
	// 	}
	// }

	// Prevent default behavior of Escape key to allow custom handling
	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			event.preventDefault()
			closeModal()
		}
	}
</script>

<dialog open>
	<!-- For browsers that don't support dialog backdrop -->
	<button
		class="backdrop"
		onclick={handleBackdropClick}
		onkeydown={handleKeyDown}
	></button>

	<div class="dialog-content">
		{@render children()}
		<button onclick={closeModal}>Close</button>
	</div>
</dialog>

<style>
	dialog {
		border: none;
		padding: 0;
		background: none;
	}

	.dialog-content {
		/* background: white;
		border-radius: 8px;
		padding: 1rem;
		position: relative; */

		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 2rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		z-index: 2;
	}

	/* Backdrop styles */
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.5);
	}

	/* For browsers that don't support dialog backdrop */
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
</style>
