import { defineStore } from 'pinia'

import {

} from "@/helpers/axios/requests"

export const useAppStore = defineStore('app', {
  state: () => ({

  }),

  getters: {

  },

  actions: {

  },
});

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoadingApp: false,
    isLoadingsKeys: {},
  }),

  getters: {
    getIsLoadingsKeys(state) {
      return (key) => state.isLoadingsKeys?.[key] || null
    }
  },

  actions: {
    setIsLoadingApp(data) {
      this.isLoadingApp = data
    },
    setIsLoadingsKeys(key, value) {
      if(key) {
        this.isLoadingsKeys = {
          ...this.isLoadingsKeys,
          [key]: value,
        }
      }
    },
    // clearIsLoadingsKeys(){
    //   this.isLoadingsKeys = {}
    // },
  },
});

export const useModalStore = defineStore('modal', {
  state: () => ({
    isShowModalKeys: {},
  }),

  getters: {
    getIsShowModalKeys(state) {
      return (key) => state.isShowModalKeys?.[key] || null
    }
  },

  actions: {
    setIsShowModalKeys(key, value){
      this.isShowModalKeys = {
        ...this.isShowModalKeys,
        [key]: value
      }
    },
    clearIsShowModalKeys(){
      this.isShowModalKeys = {}
    },
  },
});

export const useToastsStore = defineStore('toasts', {
  state: () => ({
    toastsList: [],
  }),

  getters: {

  },

  actions: {
    setToastsSuccess(message) {
      const lastElement = this.toastsList?.length ? this.toastsList[this.toastsList.length - 1] : null;
      this.toastsList.push({
        type: 'success',
        message: message,
        id: lastElement ? lastElement.id + 1 : 1
      })
    },
    setToastsInfo(message) {
      const lastElement = this.toastsList?.length ? this.toastsList[this.toastsList.length - 1] : null;
      this.toastsList.push({
        type: 'info',
        message: message,
        id: lastElement ? lastElement.id + 1 : 1
      })
    },
    setToastsWarning(message) {
      const lastElement = this.toastsList?.length ? this.toastsList[this.toastsList.length - 1] : null;
      this.toastsList.push({
        type: 'warning',
        message: message,
        id: lastElement? lastElement.id + 1 : 1
      })
    },
    setToastsError(message) {
      const lastElement = this.toastsList?.length ? this.toastsList[this.toastsList.length - 1] : null;
      this.toastsList.push({
        type: 'error',
        message: message,
        id: lastElement ? lastElement.id + 1 : 1
      })
    },
  },
});