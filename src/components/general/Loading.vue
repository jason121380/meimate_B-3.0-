<template>
<div>
  <transition name="fade">
    <div v-if="loadingArray.length > 0" class="fixed left-0 top-0 z-[9999] size-full bg-[rgba(256,256,256,0.9)]">
      <div class="absolute left-16 top-24 size-1.5 animate-reverse-float rounded-full bg-[#FEB401]"></div>
      <div class="absolute left-[45%] top-24 size-[3px] animate-float rounded-full bg-white"></div>
      <div class="absolute right-14 top-12 z-10 animate-reverse-float">
        <div class="z-20 size-0 rotate-[50deg] border-x-[10px] border-b-[20px] border-x-transparent border-b-[#FEB401]"></div>
      </div>
      <div class="absolute bottom-16 left-14 animate-reverse-float">
        <div class="z-20 size-0 rotate-[65deg] border-x-[12.5px] border-b-[25px] border-x-transparent border-b-[#FEB401]"></div>
      </div>
      <div class="absolute bottom-36 right-10 animate-reverse-float">
        <div class="z-20 size-0 rotate-[65deg] border-x-[12.5px] border-b-[25px] border-x-transparent border-b-[#232D4E]"></div>
      </div>

      <img src="@/assets/images/loading/top-circle.png" alt="loading" class="absolute right-0 top-0 max-w-[50%]">
      <img src="@/assets/images/loading/bottom-circle.png" alt="loading" class="absolute bottom-5 left-0 max-w-[60%]">

      <img src="@/assets/images/loading/deyer.svg" alt="吹風機" class="absolute left-3 top-[22%] animate-reverse-float text-red-500">

      <div class="absolute right-1/4 top-[39%] z-10 flex animate-float items-center justify-center">
        <img src="@/assets/images/loading/scissors-left.svg" alt="loading" class="h-9 translate-x-1.5 rotate-[-30deg] animate-cut">
        <img src="@/assets/images/loading/scissors-right.svg" alt="loading" class="h-8 -translate-x-5 -translate-y-1 rotate-[-30deg]">
      </div>

      <img src="@/assets/images/loading/triangle.svg" alt="空心三角形" class="absolute bottom-32 left-1/2 animate-float">

      <div class="absolute left-[calc(50%-128px)] top-[20%] size-64 animate-reverse-spin-slow rounded-[48%] border-2 border-[#FEB401] after:absolute after:left-0 after:top-0 after:m-[30px] after:size-3.5 after:rounded-full after:bg-[#FEB401] after:content-['']"></div>
      <div class="absolute left-[calc(50%-112px)] top-[22%] size-56 animate-spin-slow rounded-full border-2 border-white bg-[#fffcdf] after:absolute after:left-0 after:top-0 after:m-[26px] after:size-2.5 after:rounded-full after:bg-[#ACE6FF] after:content-['']"></div>

      <div class="absolute left-[calc(50%-68.8px)] top-[33%] flex">
        <span class="animate-floatText-1 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">L</span>
        <span class="animate-floatText-2 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">o</span>
        <span class="animate-floatText-3 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">a</span>
        <span class="animate-floatText-4 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">d</span>
        <span class="animate-floatText-5 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">i</span>
        <span class="animate-floatText-6 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">n</span>
        <span class="animate-floatText-7 bg-gradient-to-t from-[#094194] to-[#5d7a9d] bg-clip-text text-4xl font-extrabold text-transparent">g</span>
      </div>

      <div class="absolute left-20 top-[55%] size-1 animate-shine rounded-full bg-white"></div>
      <div class="absolute right-16 top-[60%] size-1 animate-shine-yellow rounded-full bg-[#FEB401]"></div>

      <div class="absolute right-10 top-[65%] size-[3px] animate-reverse-float rounded-full bg-white"></div>
      <div class="absolute bottom-1/4 right-10 size-1 animate-float rounded-full bg-white"></div>
      <div class="absolute bottom-40 right-20 size-[3px] animate-float rounded-full bg-white"></div>
      <div class="absolute bottom-24 right-16 size-3.5 animate-float rounded-full bg-[#FEB401]"></div>
      <div class="absolute bottom-1/2 left-10 size-[5px] animate-reverse-float rounded-full bg-white"></div>
      <div class="absolute bottom-14 left-32 size-1 animate-float rounded-full bg-white"></div>
      <div class="absolute bottom-20 left-40 size-5 animate-reverse-float rounded-full bg-[#232D4E]"></div>
      <div class="absolute bottom-52 left-52 size-2.5 animate-reverse-float rounded-full bg-[#FEB401]"></div>
      <div class="absolute bottom-[30%] left-14 size-5 animate-float rounded-full bg-[rgba(254,180,1,0.5)]"></div>
      <div class="absolute right-12 top-[30%] size-[5px] animate-float rounded-full bg-white"></div>
      <div class="absolute right-10 top-[37%] size-[3px] animate-reverse-float rounded-full bg-[#FEB401]"></div>

      <div class="absolute bottom-40 left-32 animate-float">
        <div class="h-1 w-4 rotate-[65deg] bg-white"></div>
        <div class="h-1 w-4 -translate-y-1 rotate-[-40deg] bg-white"></div>
      </div>
      <div class="absolute bottom-24 right-32 animate-reverse-float">
        <div class="h-1 w-4 rotate-[65deg] bg-white"></div>
        <div class="h-1 w-4 -translate-y-1 rotate-[-40deg] bg-white"></div>
      </div>

    </div>
  </transition>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Loading-Async',
  computed: {
    ...mapState('config', ['loadingArray']),
  },
};
</script>
