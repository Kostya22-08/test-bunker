<template>
  <div class="pagination" v-if="totalPages > 1">
    <div class="pagination-box">
      <div 
        :class="`pagination-btn ${currentPage === 1 ? 'disabled' : ''}`" 
        @click="currentPage > 1 ? getCurrentPage(currentPage - 1) : false"
      >
        <ChevronDownIcon 
          isNoHover 
          class="left-rotate"
        />
      </div>
      <div
        v-if="currentPage !== 1" 
        :class="`pagination-btn ${currentPage - 1 > 1 ? 'not-show-items-in-mobile' : ''}`" 
        @click="getCurrentPage(1)"
      >
        1
      </div>

      <div 
        v-if="currentPage > 3"
        class="pagination-dotted not-show-items-in-mobile"
      >
        ...
      </div>

      <div 
        v-if="currentPage - 1 > 1"
        class="pagination-btn" 
        @click="getCurrentPage(currentPage - 1)"
      >
        {{ currentPage - 1 }}
      </div>
      <div 
        class="pagination-btn active"
      >
        {{ currentPage }}
      </div>
      <div 
        v-if="currentPage + 1 < totalPages"
        class="pagination-btn" 
        @click="getCurrentPage(currentPage + 1)"
      >
        {{ currentPage + 1 }}
      </div>

      <div 
        v-if="currentPage < totalPages - 2"
        class="pagination-dotted not-show-items-in-mobile"
      >
        ...
      </div>

      <div 
        v-if="currentPage !== totalPages" 
        :class="`pagination-btn ${currentPage + 1 < totalPages ? 'not-show-items-in-mobile' : ''}`" 
        @click="getCurrentPage(totalPages)"
      >
        {{ totalPages }}
      </div>
      <div 
        :class="`pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`" 
        @click="currentPage !== totalPages ? getCurrentPage(currentPage + 1) : false"
      >
        <ChevronDownIcon 
          isNoHover 
          class="right-rotate"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'UiPagination',
  props: {
    totalPages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    getCurrentPage(val) {
      this.$emit("change", val)
    },
  },
}
</script>
<style scoped lang="scss">
.pagination {
  width: 100%;
  display: flex;
  // justify-content: flex-end;
  justify-content: center;
  align-items: center;

  &-box {
    display: flex;
    align-items: center;
    // color: #343434;
  }

  &-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 4px;
    margin: 0 8px;
    border: 1px solid transparent;
    background: linear-gradient(#fff, #fff) padding-box, linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%) border-box;

    &>svg {
      width: 24px;
      height: 24px;
      min-width: 24px;
      min-height: 24px;
      max-width: 24px;
      max-height: 24px;
    }
  }

  &-dotted {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    min-width: 40px;
    min-height: 40px;
    max-width: 40px;
    max-height: 40px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 4px;
    margin: 0 8px;
    background: none;
  }
}

.left-rotate {
  transform: rotate(90deg)
}

.right-rotate {
  transform: rotate(-90deg)
}


.active {
  color: #fff;
  border: none;
  cursor: default;
  background: $colorLinearPurpleToPink;
}

.disabled {
  opacity: 0.3;
  cursor: default;
}

@media only screen and (max-width: 768px) {

  .not-show-items-in-mobile {
    display: none;
  }

  .pagination {

    &-btn {
      min-width: 38px;
      min-height: 38px;
      max-width: 38px;
      max-height: 38px;
    }

    &-dotted {
      min-width: 38px;
      min-height: 38px;
      max-width: 38px;
      max-height: 38px;
    }
  }
}
</style>