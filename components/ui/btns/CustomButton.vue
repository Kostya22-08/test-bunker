<template>
	<nuxt-link v-if="link"
		:class="`${btnClass} flex_center_center pt_8 pb_8 pl_24 pr_24 border-radius-10 ${type == 'dark' ? (isDisabled ? 'background_181B29 shadow_08090E not_allowed' : 'background_282D44 shadow_161A2C shadow_hover_464b62b3 pointer') : (isDisabled ? 'background_5C2BA5 shadow_411C78 not_allowed' : 'background_9147FF shadow_4A0DA4 shadow_hover_5C2BA5_d3b5ffb3 pointer')}`"
		:to="link"
		:event="(isDisabled || isLoading) ? '' : 'click'"
	>
		<div v-if="isLoading" class="UiBtnsCustomButton__spinner"></div>
		<span :class="`s14__w500__h22 ${type == 'dark' ? (isDisabled ? 'color_81869D' : 'color_ADADC2') : (isDisabled ? 'color_D3B5FF' : '')} ${textClass}`">
			{{ label }}
		</span>
	</nuxt-link>
	<button v-else
		:class="`${btnClass} flex_center_center pt_8 pb_8 pl_24 pr_24 border-radius-10 ${type == 'dark' ? (isDisabled ? 'background_181B29 shadow_08090E not_allowed' : 'background_282D44 shadow_161A2C shadow_hover_464b62b3 pointer') : (isDisabled ? 'background_5C2BA5 shadow_411C78 not_allowed' : 'background_9147FF shadow_4A0DA4 shadow_hover_5C2BA5_d3b5ffb3 pointer')}`"
		@click.stop="(isDisabled || isLoading) ? '' : $emit('click')"
	>
		<div v-if="isLoading" class="UiBtnsCustomButton__spinner"></div>
		<span :class="`s14__w500__h22 ${type == 'dark' ? (isDisabled ? 'color_81869D' : 'color_ADADC2') : (isDisabled ? 'color_D3B5FF' : '')} ${textClass}`">
			{{ label }}
		</span>
	</button>
</template>

<script>
export default {
	name: "UiBtnsCustomButton",

	emits: ['click'],

	props: {
		link: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: ''
		},
		btnClass: {
			type: String,
			default: ''
		},
		textClass: {
			type: String,
			default: ''
		},
		type: {
			type: String,
			default: 'primary',
			validator(value) {
				return ['primary', 'dark'].includes(value)
			}
		},
		isDisabled: Boolean,
		isLoading: Boolean,
	},
}
</script>

<style scoped lang='scss'>
.UiBtnsCustomButton__spinner {
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	z-index: 5;
	border-radius: 10px;

	&::before {
		content: '';
		width: 20px;
		height: 20px;
		border-radius: 100%;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		margin: auto;
		animation: spin 1s infinite ease;
	}
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>