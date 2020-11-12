<template>
    <nav class="pagination"
        role="navigation"
        aria-label="pagination"
        v-show="pagesTotal > 1"
    >
        <a class="pagination-previous"
            :disabled="page <= 1 || loading"
            @click="prevPage">Назад</a>

        <a class="pagination-next"
            :disabled="page >= pagesTotal || loading"
            @click="nextPage">Вперёд</a>

        <ul class="pagination-list" :class="{ 'is-invisible': loading }">
            <li>
                <a class="pagination-link"
                    aria-label="Goto page 1"
                    :disabled="page == 1"
                    @click="setPage(1)">1</a>
            </li>

            <li v-show="pagesTotal > 5 && page > 3">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <li v-for="number in pageNumbers"
                :key="number">
                <a class="pagination-link"
                    :aria-label="`Goto page ${number}`"
                    v-text="number"
                    :disabled="page == number"
                    @click="setPage(number)"></a>
            </li>
            
            <li v-show="pagesTotal > 5 && page < (pagesTotal - 2)">
                <span class="pagination-ellipsis">&hellip;</span>
            </li>

            <li>
                <a class="pagination-link"
                    :aria-label="`Goto page ${pagesTotal}`"
                    v-text="pagesTotal"
                    :disabled="page == pagesTotal"
                    @click="setPage(pagesTotal)"></a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['data'],

    data() {
        return {
            page: this.data.current_page,
            pageNumbers: [],
            pagesTotal: 1,
            loading: false
        };
    },

    watch: {
        data() {
            this.refresh();
        }
    },

    mounted() {
        this.refresh();
    },

    methods: {
        refresh() {
            this.pagesTotal = this.data.last_page;

            if (this.data.current_page > this.pagesTotal) {
                this.setPage(this.pagesTotal);
            } else {
                if (this.page != this.data.current_page) {
                    window.scrollTo(0, 0);
                }

                this.page = this.data.current_page;
                this.loading = false;

                this.calculatePageNumbers();
            }
        },

        nextPage () {
            if (this.page < this.pagesTotal) {
                this.setPage(this.page + 1);
            }
        },

        prevPage () {
            if (this.page > 1) {
                this.setPage(this.page - 1);
            }
        },

        setPage (page) {
            if (this.page != page) {
                this.loading = true;

                this.$emit('pageChanged', page);
            }
        },

        calculatePageNumbers () {
            this.pageNumbers = [];

            if (this.pagesTotal > 2) {
                let number = this.page - 1;

                // 3 page numbers starting from the previous page
                while (this.pageNumbers.length < 3) {
                    // if the number is not the first or the last page
                    if (number > 1 && number < this.pagesTotal) {
                        this.pageNumbers.push(number);
                    }

                    number++;

                    if (number > this.pagesTotal) {
                        break;
                    }
                }

                // If there's still less than 3 numbers, try to add numbers in the beginning
                number = this.pageNumbers[0] - 1;
                while (this.pageNumbers.length < 3) {
                    if (number < 2) {
                        break;
                    }

                    this.pageNumbers.unshift(number);

                    number--;
                }
            }
        }
    }
}
</script>
