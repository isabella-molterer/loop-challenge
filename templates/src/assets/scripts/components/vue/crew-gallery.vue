<template>
	<div id="gallery" class="gallery color-light">
		<div class="gallery__header container">
			<div class="gallery__headline">
				<h2 class="h2 color-light">Unser Team</h2>
				<h3 class="h3 color-light">Subtitle goes here</h3>
			</div>
			<div class="gallery__filter">
				<a @click="filterData(filter)" v-for="filter in filters" :key="filter" v-bind:class="{ 'is--active' : filter === this.filter }" class="gallery__filter__item color-light label">
					{{ filter }}
				</a>
			</div>
		</div>
		<div v-if="loading" class="gallery__preloader">
			<span id="preloader" ref="preloader"></span>
		</div>
		<div v-else class="gallery__wrapper">
			<ul v-if="crew" class="gallery__wrapper__items">
				<li v-for="crewMember in crew" :key="crewMember.id" class="gallery__wrapper__item">
					<img :src="crewMember.image" :alt="crewMember.name">
					<div class="gallery__wrapper__item__overlay">
						<h3>{{ crewMember.name }}</h3>
						<p>{{ crewMember.duties }}</p>
					</div>
				</li>
			</ul>
			<div v-if="pagination" class="gallery__pagination">
				<a @click="updatePage(page)" v-for="page in pagination.total_pages" :key="page" v-bind:class="{ 'is--active' : page === pagination.current_page }" class="gallery__pagination__page color-light">
					{{ page }}
				</a>
			</div>
			<a @click="loadMore()"  v-if="page < pagination.total_pages" class="gallery__button button button--style--primary-white button--size--default">
				<div class="button__inner">
					<span class="button__label">Load More</span>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
import { call } from 'Models/http-request.js';
import { showPreloader, hidePreloader } from 'Models/preloader.js';
export default {
	el: '#gallery',
	data () {
		return {
			crew: null,
			limit: 5,
			loading: true,
			filters: ['all', 'trim', 'tactic', 'helmsman'],
			filter: 'all',
			pagination: null,
			page: 1,
		};
	},
	async mounted () {
		this.loading = true;
		showPreloader(this.$refs.preloader, { size: 'big' });
		await this.loadData('all', 1, 5).then(() => {
			this.loading = false;
			hidePreloader(this.$refs.preloader);
		});
	},
	methods: {
		async loadData (duty = 'all', page = 1, limit = 5) {
			let data = null;
			if (duty === 'all') {
				data = {
					page,
					limit,
				};
			} else {
				data = {
					duty,
					page,
					limit,
				};
			}
			await call('https://challenge-api.view.agentur-loop.com/api/', 'GET', data, true).then(response => {
				this.crew = response.data.data;
				this.pagination = response.data.meta.pagination;
			}).catch(error => {
				console.log(error);
			});
		},
		async loadMore () {
			this.limit += 5;
			await this.loadData(this.filter, this.page, this.limit);
		},
		async filterData (filter) {
			this.limit = 5;
			this.filter = filter;
			await this.loadData(this.filter, this.page, this.limit);
		},
		async updatePage (page) {
			this.limit = 5;
			this.page = page;
			await this.loadData(this.filter, this.page, this.limit);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
