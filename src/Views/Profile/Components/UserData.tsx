import { useHighestTierNFT } from '@Hooks/useNFTGraph';
import { useUserAccount } from '@Hooks/useUserAccount';
import { Col } from '@Views/Common/ConfirmationModal';
import { useLeaderboardQuery } from '@Views/V2-Leaderboard/Hooks/useLeaderboardQuery';
import { useWeeklyLeaderboardQuery } from '@Views/V2-Leaderboard/Hooks/useWeeklyLeaderboardQuery';

export const UserData = () => {
  const { address } = useUserAccount();
  const { winnerUserRank: dailyRank } = useLeaderboardQuery();
  const { winnerUserRank: weeklyRank } = useWeeklyLeaderboardQuery();
  const { highestTierNFT } = useHighestTierNFT();
  console.log(dailyRank, weeklyRank, 'ranks');

  return (
    <div className="flex items-center justify-between sm:flex-col sm:items-stretch sm:gap-4">
      {/* left side */}

      <div className="flex items-center gap-7 sm:gap-5">
        <div className="relative w-[113px] h-[113px]">
          {highestTierNFT !== null ? (
            <img
              src={
                'https://gateway.pinata.cloud/ipfs/' +
                highestTierNFT?.nftImage.split('://')[1]
              }
              alt=""
              width={100}
              height={100}
              className={
                'absolute z-0 rounded-full left-[0] right-[0] top-[0] bottom-[0] m-auto'
              }
            />
          ) : (
            <img
              src="https://a.slack-edge.com/production-standard-emoji-assets/14.0/google-large/1f419@2x.png"
              width={60}
              height={60}
              className={
                'absolute z-0 rounded-full left-[0] right-[0] top-[0] bottom-[0] m-auto'
              }
            />
            // <svg
            //   className={
            //     'absolute z-0 rounded-full left-[0] right-[0] top-[0] bottom-[0] m-auto'
            //   }
            //   width="113"
            //   height="113"
            //   viewBox="0 0 113 113"
            //   fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
            // >
            //   <ellipse cx="57" cy="55.5" rx="49" ry="48.5" fill="#FFA5A7" />
            //   <mask
            //     id="mask0_1_53"
            //     maskUnits="userSpaceOnUse"
            //     x="6"
            //     y="5"
            //     width="102"
            //     height="101"
            //   >
            //     <ellipse
            //       cx="57"
            //       cy="55.4796"
            //       rx="51"
            //       ry="50.4796"
            //       fill="#FFA5A7"
            //     />
            //   </mask>
            //   <g mask="url(#mask0_1_53)">
            //     <path
            //       d="M28.9731 108.36C29.0462 103.78 31.0295 93.0443 38.3777 86.7472C36.7232 85.9623 33.3952 83.5555 33.3188 80.2076C33.2424 76.8598 32.6437 76.8365 32.3539 77.2433C30.2235 76.3713 26.0369 73.3286 26.3334 68.1336C26.704 61.6398 28.9071 60.3173 23.9943 53.1092C27.2839 53.5773 34.2407 55.4019 35.7504 58.9562C36.9998 61.8975 37.4507 63.5812 37.5596 64.3095L37.1152 58.9448C35.9324 56.5282 33.7658 50.0859 34.5615 43.6493C35.3572 37.2126 40.2813 32.4098 42.6439 30.8129C45.7174 28.3913 54.225 24.3715 63.667 27.6657C73.1089 30.9598 78.0816 37.0998 79.3877 39.758L81.2002 46.173L81.6662 51.1432L83.1085 53.1634C84.5412 51.5945 88.166 48.59 91.2034 49.1228L89.0804 52.7801L88.492 58.6084L90.2485 58.2905C89.4288 59.4195 87.8132 62.3325 87.9078 64.9523C88.0024 67.572 88.4171 71.4792 88.6126 73.1053L88.6504 77.6545L87.0028 80.125L83.0467 82.19C83.0267 83.4337 82.6926 86.2876 81.5158 87.7532L83.8957 93.1019L85.9097 98.2109L87.0874 104.874L87.1118 107.816L28.9731 108.36Z"
            //       fill="#CE67FF"
            //     />
            //     <g opacity="0.15">
            //       <path
            //         d="M82.4772 108.552C82.4049 99.8658 79.4688 96.93 78.0098 96.5479C80.0243 99.5399 80.0684 105.812 79.8387 108.574L82.4772 108.552Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M67.8108 88.2919C68.1894 84.4572 63.1076 83.1951 60.7252 82.4061L62.8019 80.478C62.7582 80.6313 63.2614 80.9161 65.4577 80.9597L63.3781 80.4732L63.9724 78.9821L65.0051 75.5158C65.3046 76.2817 66.841 78.1757 70.5897 79.6246C75.2756 81.4358 76.1619 85.887 73.8827 88.9996C71.6035 92.1123 70.6193 94.1223 70.7393 97.6092L70.3852 98.7951L69.7343 96.7097C69.778 97.066 69.8333 97.3736 69.8901 97.6163C69.1604 96.1868 67.3072 93.3916 67.8108 88.2919Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M38.4459 94.9662C33.5838 96.7779 32.0858 104.593 31.9446 108.275L28.3962 108.304L30.2423 100.524L32.262 95.3816L34.7393 90.5688L37.427 86.1265C36.6256 85.8093 35.9091 85.3617 35.4188 84.7397C33.8983 82.8112 33.1226 80.9574 32.9248 80.2716C35.7511 82.1488 40.9767 83.45 40.9818 75.3214L41.5768 75.8429L39.9047 73.4499L37.6668 66.9475L37.2087 62.9173L37.1776 59.187C35.3771 55.4309 32.8205 45.8536 36.998 37.5933C41.1755 29.3329 51.2136 26.7482 55.7104 26.4883C38.3264 33.9365 37.6671 48.7493 39.5104 55.2246L39.9919 54.7657C39.0839 65.2068 43.8503 70.1211 46.347 71.2731C46.0208 71.3805 45.2065 72.5075 44.3581 73.8101C43.5623 76.0623 42.9978 81.3595 46.2396 87.5311C49.6912 94.1023 55.4611 97.3825 57.9145 98.2012C55.5759 99.0295 50.1948 99.9397 47.3795 96.9543C44.5643 93.969 40.2508 94.385 38.4459 94.9662Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M33.5628 73.1083C28.4083 71.8409 26.9217 67.1784 26.8228 65.0056C25.2421 73.3413 30.2177 76.9173 32.9031 77.6634L33.5628 73.1083Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M83.5595 81.8825C83.5012 81.6753 83.4453 81.4527 83.3929 81.2158C82.8034 79.3329 81.0992 76.5005 80.3853 75.8428L83.8908 70.6575C82.6823 74.8678 82.8561 78.7896 83.3929 81.2158C83.468 81.4556 83.525 81.68 83.5595 81.8825Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M86.5277 59.5043C86.5245 56.2044 85.1908 53.1461 84.5244 52.0294L83.1712 53.4359L84.5637 56.7606L85.4735 60.3927L86.5277 59.5043Z"
            //         fill="black"
            //       />
            //     </g>
            //     <path
            //       d="M81.6683 51.2949C82.2975 43.1612 76.5951 26.3449 54.5889 26.528C45.0052 26.6078 26.3544 37.8335 37.8981 60.5155M39.9898 54.4624C38.8718 56.4196 37.6585 59.8099 37.5867 63.7028M42.5696 76.5517C38.6949 72.4328 37.5114 67.7907 37.5867 63.7028M79.6516 49.5829C80.7404 50.2655 82.0639 51.4851 83.1561 53.2843M79.958 75.474C81.0753 74.8884 84.4133 71.5075 85.1971 63.5797C85.2832 62.7091 85.314 61.8801 85.2972 61.0918M77.1739 72.5939C79.1995 74.264 82.5393 78.0339 83.0369 82.0688M62.683 80.7216C70.1056 79.7196 73.1219 85.0024 70.8035 90.6934C69.0488 95.0007 69.9683 98.3574 70.7486 99.7029C70.7796 99.7562 70.8573 99.7242 70.8518 99.6628C70.4079 94.6636 77.6735 92.4862 81.2256 88.059M46.7065 70.6939C44.0106 73.1375 40.0653 79.3993 42.6568 87.0322M65.1285 75.7271C64.869 80.0718 60.6593 82.6726 57.1339 84.0806C55.2363 84.8384 53.1466 85.806 52.7056 87.8012C51.8147 91.8321 55.8429 95.9043 58.5015 97.5758C58.5479 97.605 58.5311 97.675 58.4768 97.6821C53.9416 98.2668 48.3507 97.1218 44.5089 90.9122C43.6902 89.5888 43.0845 88.2919 42.6568 87.0322M37.5867 63.7028C37.4098 63.403 37.1661 63.0596 36.8613 62.7079M42.6568 87.0322C40.8336 87.0558 39.3318 86.8475 38.1024 86.4413M83.0369 82.0688C83.1746 83.1846 83.0949 84.3207 82.7099 85.4382C82.3776 86.4031 81.861 87.267 81.2256 88.059M83.0369 82.0688C85.5151 81.8561 90.1048 79.6443 88.638 72.4985C86.8409 63.7434 88.4678 60.2632 90.9147 58.0238C90.9578 57.9844 90.9236 57.9133 90.8662 57.924C90.2471 58.0397 89.3922 58.2676 88.5226 58.625M85.2972 61.0918C85.2269 57.7926 84.3236 55.2074 83.1561 53.2843M85.2972 61.0918C85.9366 59.9539 87.2454 59.1498 88.5226 58.625M83.1561 53.2843C83.999 51.9787 86.8109 49.279 91.3681 48.8027C91.4229 48.797 91.4554 48.8638 91.4169 48.9032C90.0909 50.2613 87.8239 53.9097 88.5226 58.625M38.1024 86.4413C35.0443 89.5115 28.9494 98.1996 29.0342 108.39M38.1024 86.4413C34.1592 85.1384 33.0178 81.7991 33.0595 77.5408M81.2256 88.059C83.215 90.6306 87.214 98.2001 87.2947 107.905M77.6452 96.4296C78.4092 97.1208 79.953 100.396 80.016 107.966M43.7711 97.0147C42.8636 98.5186 41.0598 102.879 41.1048 108.289M33.0595 77.5408C33.0784 75.6016 33.3427 73.4719 33.6995 71.2571C34.7775 64.5636 31.7044 61.4437 29.9031 60.6435C29.8537 60.6216 29.8574 60.5492 29.9088 60.5325C33.0703 59.5021 35.54 61.1834 36.8613 62.7079M33.0595 77.5408C30.4227 76.7741 25.4785 73.2666 26.7958 65.3698C28.0492 57.8564 25.0625 53.9751 23.1778 52.7931C23.1228 52.7586 23.1521 52.6662 23.2164 52.6755C27.6704 53.3204 37.5117 56.7521 36.8613 62.7079"
            //       stroke="black"
            //       stroke-width="1.1656"
            //       stroke-linecap="round"
            //     />
            //     <ellipse
            //       cx="74.6887"
            //       cy="58.1166"
            //       rx="4.33709"
            //       ry="4.36742"
            //       transform="rotate(-0.476665 74.6887 58.1166)"
            //       fill="white"
            //       stroke="black"
            //       stroke-width="1.1656"
            //     />
            //     <ellipse
            //       cx="56.6818"
            //       cy="59.3583"
            //       rx="4.33709"
            //       ry="4.36742"
            //       transform="rotate(-0.476665 56.6818 59.3583)"
            //       fill="white"
            //       stroke="black"
            //       stroke-width="1.1656"
            //     />
            //     <path
            //       d="M64.6624 66.9333C66.531 68.3519 68.1595 67.6604 68.9779 67.0325C69.1294 66.9163 69.2024 66.7224 69.1563 66.5371C69.0907 66.2736 68.9474 65.9071 68.5932 65.477"
            //       stroke="black"
            //       stroke-width="1.1656"
            //       stroke-linecap="round"
            //       stroke-linejoin="round"
            //     />
            //     <path
            //       d="M27.5138 107.796L29.7627 101.044L33.117 103.2L41.2613 105.104L41.2629 105.287L41.5265 104.161L42.6343 98.7834L37.1603 97.0394L33.5012 94.7041C33.0537 94.3843 32.2916 93.6708 32.8229 93.3752L37.1554 85.5139L40.379 86.5487L42.8053 86.5285L44.7523 90.8799L47.6031 94.4958L52.748 96.7884L64.6052 107.487L41.2806 107.414L41.2828 107.681L27.5138 107.796Z"
            //       fill="#363636"
            //     />
            //     <path
            //       d="M73.7538 98.8581L70.6416 103.919L74.7325 107.13L87.4401 107.024L86.6433 98.7509L84.5914 92.7322L81.8152 87.1442L76.4564 91.9506L73.7538 98.8581Z"
            //       fill="#363636"
            //     />
            //     <path
            //       d="M56.3095 83.8078C52.9716 85.0731 52.3571 87.5309 52.4671 88.6017L65.9751 100.864L69.6661 96.1018L69.6525 94.4641L70.8308 90.2687C71.5013 89.4442 72.4897 86.9732 71.0793 83.685C69.6689 80.3968 64.81 79.9155 62.5569 80.0859C61.8652 80.7994 59.6474 82.5426 56.3095 83.8078Z"
            //       fill="#505050"
            //     />
            //     <g opacity="0.15">
            //       <path
            //         d="M36.2919 105.721C32.7429 104.95 31.4868 106.6 31.3024 107.522L27.9359 107.55L29.7663 101.529L29.7527 99.8915L30.5484 97.0945L31.1939 94.4807L31.6074 93.1427L32.8238 93.5269L34.2773 89.6022L37.0054 85.7579L39.376 86.3448L42.4999 86.7841C42.3012 86.3126 42.5576 86.5183 42.8377 86.8316L42.4999 86.7841C42.6703 87.1886 43.1757 88.0915 44.2884 89.8526C46.698 93.6663 51.0154 96.3884 52.8729 97.2727L65.088 107.241L62.3281 107.264C59.6983 106.145 54.1466 100.892 51.6995 98.4047C50.7464 98.079 48.3522 97.092 46.3999 95.7494C44.4476 94.4069 42.7024 93.6571 42.0739 93.45C37.0186 92.4487 34.2784 99.4495 33.5401 103.075C34.639 103.915 39.2633 104.392 41.4381 104.526L41.4459 105.466C41.2067 105.872 39.8409 106.492 36.2919 105.721Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M35.3813 87.4092L25.1153 78.3955L24.0053 79.8606L25.7461 81.302L34.6041 88.7806L35.3813 87.4092Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M84.3148 106.929C83.1107 99.2716 79.4636 96.1921 77.7906 95.6095L79.6785 100.143L80.0082 106.965L84.3148 106.929Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M55.4001 91.1553L63.7607 82.5932C62.4569 82.6344 59.3047 82.8972 57.1269 83.619L61.2961 81.6432L62.1099 81.0298L65.2549 83.5514L65.5277 83.8127L65.8008 83.5468L65.2496 82.9145L62.6816 80.4791L64.4363 79.9489L68.5091 80.9766C68.8427 80.9738 69.6878 81.2033 70.3993 82.1437C71.2887 83.3192 71.4171 84.1674 71.4241 85.0166C71.4312 85.8658 71.5004 86.8964 71.4436 87.3518C71.3867 87.8073 71.208 88.203 71.0907 88.6893C70.9969 89.0783 70.2858 91.5875 69.942 92.7935L69.6349 95.9807L66.19 101.166L65.03 100.265L68.0593 96.1758L67.6123 93.4801L63.0152 98.7048L62.0048 97.5607L68.5851 90.1054C68.9403 89.059 68.857 87.5452 68.7709 86.9191L68.3613 86.5268L67.5691 88.294L60.1083 95.6354L59.0706 94.8554L67.5731 85.7718L65.5277 83.8127L56.5642 92.5408L55.4001 91.1553Z"
            //         fill="black"
            //       />
            //     </g>
            //     <path
            //       d="M23.8547 80.0438L34.999 88.8986L36.5485 85.5797L26.7663 76.38L23.8547 80.0438Z"
            //       fill="#AF794C"
            //     />
            //     <path
            //       d="M34.6969 103.551L41.2627 105.286L42.6649 98.8438C42.0162 98.6369 40.6274 98.1935 40.2625 98.0752C39.8975 97.9569 39.3999 97.6881 39.1967 97.5685C38.791 97.4101 37.8152 97.034 37.1581 96.7968C36.3367 96.5004 35.0584 95.9651 34.6318 95.726C34.2905 95.5347 33.9607 95.2665 33.8385 95.1563L31.6668 92.9602L30.58 93.5759C30.0985 92.8115 29.0315 91.1866 28.6158 90.8018C28.0961 90.3209 28.1864 90.2291 27.9417 89.9885C27.746 89.796 27.3308 89.4679 27.1476 89.3279L25.097 87.1005L22.7541 86.2101C23.1255 87.0967 23.9411 89.6154 24.2328 92.5975C24.5245 95.5795 27.6596 97.3915 29.1906 97.9247L29.5935 98.9526L30.2864 102.04L34.6969 103.551Z"
            //       fill="#FF3541"
            //     />
            //     <path
            //       d="M65.456 107.693L53.3016 97.7241L56.7871 97.4221L58.0846 96.6227L54.2057 93.3793L52.5349 89.42L55.8045 92.3348L66.0053 100.803L69.7587 96.2526L70.2667 98.9781L71.6656 95.7818L73.4666 93.5224L76.0031 92.1668L73.7817 98.5849L70.3096 104.134L75.1913 107.612L65.456 107.693Z"
            //       fill="#FF3541"
            //     />
            //     <path
            //       d="M62.6563 80.2367C64.8127 79.9456 66.5992 80.1849 67.9918 80.8106M77.6414 95.9444C78.4054 96.6357 79.9492 99.9106 80.0122 107.481M43.7673 96.5295C43.4604 97.0381 43.051 97.8733 42.6453 98.9653M41.1011 107.804C41.0923 106.748 41.1539 105.732 41.2655 104.77M62.6158 80.2757C61.5649 81.2815 60.2899 82.0991 58.9998 82.7534M34.694 88.6888L30.9585 85.5925M27.9386 107.914C28.2192 106.395 29.0251 102.894 30.0046 101.042M30.0046 101.042C29.7252 100.515 29.4587 99.4036 29.8685 98.1314M30.0046 101.042C30.8027 102.188 34.5961 104.413 41.2655 104.77M30.9658 96.2721C30.8807 95.7543 30.8595 95.0084 31.031 94.3001M30.9658 96.2721C30.4041 96.898 30.0614 97.5325 29.8685 98.1314M30.9658 96.2721C28.6584 96.0001 26.6156 92.2844 25.8826 90.4606M30.9658 96.2721C31.1896 96.9254 32.5662 97.8461 33.2265 98.2247M33.177 92.2804C32.6292 92.338 32.2051 92.5306 31.8798 92.8068M31.031 94.3001C30.0114 91.9708 26.6987 86.9883 22.6351 86.2582C22.5923 86.2505 22.5568 86.2904 22.5696 86.332C22.8223 87.1552 23.4861 89.6497 24.2302 92.3548C25.2623 96.1072 28.4523 98.1128 29.8685 98.1314M31.031 94.3001C31.1683 93.7327 31.4292 93.1895 31.8798 92.8068M31.8798 92.8068C31.9232 93.1273 32.1353 93.577 32.5929 94.1051M42.6453 98.9653C36.6828 97.4162 33.7933 95.4907 32.5929 94.1051M42.6453 98.9653C42.0854 100.472 41.5325 102.468 41.2655 104.77M32.5929 94.1051C32.943 92.7315 34.3456 89.1067 37.1553 85.5962M37.1553 85.5962C37.505 85.7492 37.866 85.8919 38.0986 85.9561C39.328 86.3623 40.8298 86.5706 42.653 86.547C43.0807 87.8067 43.6864 89.1037 44.5051 90.427C46.8928 94.2862 49.956 96.1892 53.0214 96.9366M37.1553 85.5962C36.8193 85.4493 36.4938 85.2929 36.3027 85.1874L34.8656 83.7976M87.4729 107.418C86.7702 95.8685 83.398 89.1228 81.6623 87.0848L81.2218 87.5738C79.87 89.2587 77.9804 90.6177 76.1825 91.9304M53.0214 96.9366C55.2655 99.3245 60.9849 104.8 65.9095 107.598M53.0214 96.9366C54.3971 97.2719 55.7732 97.3746 57.0889 97.3169M52.5757 88.5097C52.5935 92.1277 56.1008 95.5833 58.4966 97.0899C58.543 97.1191 58.5268 97.19 58.4724 97.197C58.0208 97.2552 57.5587 97.2962 57.0889 97.3169M52.5757 88.5097C52.5738 88.1125 52.6139 87.7134 52.7021 87.3147C53.1437 85.3196 55.2336 84.3529 57.1312 83.5949C57.5065 83.445 57.8896 83.2816 58.2748 83.104M52.5757 88.5097C52.8327 88.7887 53.1153 89.0906 53.4214 89.4126M75.4629 107.518C73.7116 106.554 71.9022 105.386 70.0963 104.099M70.0963 104.099C72.1359 101.34 76.2084 95.0422 76.1825 91.9304M70.0963 104.099C68.7531 103.142 67.4118 102.12 66.0979 101.067M76.1825 91.9304C73.2555 94.0675 70.5718 96.0819 70.8482 99.1797C70.8537 99.2411 70.7753 99.2702 70.7444 99.2169C70.3345 98.5098 69.8864 97.2479 69.8076 95.585M66.0979 101.067C65.031 100.213 63.9821 99.3382 62.9648 98.4626M66.0979 101.067C66.6026 100.456 67.3995 99.4392 68.1381 98.3918M69.8076 95.585C69.5239 96.3184 68.8588 97.3698 68.1381 98.3918M69.8076 95.585C69.7852 95.1108 69.7928 94.604 69.8399 94.0682M57.0889 97.3169C58.0577 98.3237 60.5325 100.733 62.6809 102.317M34.8656 83.7976L30.9585 85.5925M34.8656 83.7976L30.9824 80.0419M30.9585 85.5925L30.9824 80.0419M30.9585 85.5925L26.845 82.1828M30.9824 80.0419L27.1335 76.3194C27.1135 76.3001 27.0835 76.297 27.0608 76.313C26.3355 76.8239 24.8155 78.2147 24.2013 79.9423C24.1931 79.9652 24.2003 79.9907 24.219 80.0062L26.845 82.1828M30.9824 80.0419L26.845 82.1828M26.845 82.1828L27.1015 76.5592M53.4214 89.4126C54.7317 88.0133 57.6817 84.7225 58.9998 82.7534M53.4214 89.4126C54.3156 90.3531 55.4106 91.4652 56.656 92.6783M58.9998 82.7534C58.7582 82.8759 58.5161 82.9927 58.2748 83.104M56.656 92.6783L67.9918 80.8106M56.656 92.6783C57.71 93.7051 58.8717 94.8043 60.1104 95.9331M67.9918 80.8106C69.4777 81.4782 70.5152 82.5856 71.0753 83.9579M60.1104 95.9331L71.0753 83.9579M60.1104 95.9331C61.0241 96.7658 61.9797 97.6147 62.9648 98.4626M71.0753 83.9579C71.6608 85.3927 71.7245 87.117 71.2331 88.9308M62.9648 98.4626C64.6539 96.5782 68.6184 92.2039 70.9636 89.7823M70.9636 89.7823C70.9123 89.9239 70.8577 90.066 70.7997 90.2083C70.2298 91.6073 69.9419 92.9061 69.8399 94.0682M70.9636 89.7823C71.0669 89.4968 71.1567 89.2127 71.2331 88.9308M68.1381 98.3918L53.8055 85.4577M58.2748 83.104L69.8399 94.0682M71.2331 88.9308L62.3507 80.8575"
            //       stroke="black"
            //       stroke-width="1.1656"
            //       stroke-linecap="round"
            //     />
            //     <path
            //       d="M23.983 58.909L27.9489 65.3061L30.4351 61.5547L31.7124 58.3291L31.6862 55.175C31.3786 54.6619 30.7205 53.5755 30.5487 53.3343C30.3339 53.0328 29.5888 50.9765 29.3318 49.2498C29.1262 47.8685 29.8964 46.6266 30.3072 46.1783L31.4043 43.1665L33.0275 37.7542L31.9099 34.6698C31.8043 34.1247 32.2783 32.2889 35.0196 29.3058C37.7609 26.3228 41.1136 27.7993 42.4473 28.9104L43.5977 28.6582L43.568 25.0794C42.6153 22.3677 38.5639 17.8418 29.98 21.4315C21.396 25.0213 19.4137 31.0128 19.4956 33.5599L22.4253 32.0797C22.737 31.8749 22.7865 32.4709 20.4905 36.4936C18.1946 40.5164 17.4971 43.6866 17.4354 44.7689L19.5831 44.0838L18.196 52.3452L19.6851 56.3364L21.7141 52.3159L23.983 58.909Z"
            //       fill="#984F29"
            //       stroke="black"
            //       stroke-width="0.0582798"
            //     />
            //     <path
            //       d="M42.8407 28.8464L33.4474 37.235C33.0301 38.1181 32.1657 39.939 32.0462 40.1584C31.9267 40.3778 31.7312 42.3954 31.6484 43.3767C31.069 44.2207 29.8982 45.9208 29.8501 45.9698C29.802 46.0187 29.6019 47.731 29.5079 48.581L30.0535 52.1858L31.741 54.5072L33.6979 52.7621C34.1013 52.6374 34.9664 52.1207 35.2002 51.0511C35.4339 49.9815 37.0489 49.6607 37.8271 49.634L39.8078 50.7398L43.173 50.5601L44.9144 48.4225L49.0995 44.7177L53.03 43.2292L58.0213 41.6408C59.5638 42.3357 63.172 43.897 65.2644 44.5833C67.3568 45.2695 69.2621 43.8726 69.9532 43.0884L72.1909 42.2812L75.4411 42.8608L78.3025 44.1108L81.15 47.3325L81.7844 47.0239L81.2419 40.1434C80.8875 38.8624 79.4934 35.5963 76.7524 32.7802C74.0114 29.9641 71.265 29.4187 70.2344 29.4981C68.628 28.4195 64.7165 26.1227 61.9215 25.5636C59.1264 25.0045 55.2043 26.2868 53.5926 26.9978L48.4974 27.0402L42.8407 28.8464Z"
            //       fill="#984F29"
            //     />
            //     <path
            //       d="M38.0791 54.3332C36.9648 54.5608 35.9075 55.797 35.5181 56.3866L34.2501 57.0948C33.4348 57.5262 31.8281 58.3524 31.9239 58.206C32.0437 58.0231 32.2239 57.8092 32.1309 57.5674C32.0379 57.3255 31.4261 56.6936 31.4224 56.2387C31.4186 55.7838 31.2379 55.937 31.1423 55.3918C31.0468 54.8467 31.2606 55.0269 31.4108 54.8436C31.5609 54.6604 32.4627 53.6823 33.4855 52.6729C34.5083 51.6635 34.3938 52.4834 34.6053 52.3906C34.8167 52.2979 34.8141 51.9643 35.1445 51.5672C35.4748 51.1702 35.4739 51.0792 35.9856 50.5897C36.4972 50.1001 36.6758 49.7043 37.0693 49.6101C37.4628 49.5158 37.6147 49.5449 38.0397 49.602C38.4647 49.6591 39.2598 50.4108 39.7159 50.5586C40.1721 50.7065 40.3233 50.6446 40.4741 50.5523C40.6248 50.4601 41.443 50.3623 41.686 50.3906C41.8804 50.4132 42.8414 50.7348 43.2976 50.8928L44.923 53.0327C45.1765 53.1216 45.7685 53.3047 46.1083 53.3262C46.5332 53.353 46.8367 53.3808 47.5691 53.9206C48.3016 54.4605 48.4249 54.7021 48.6407 55.1249C48.8566 55.5477 48.7658 55.5788 48.6488 56.0954C48.5318 56.612 48.0834 57.4043 47.8451 57.9219C47.6067 58.4395 47.4268 58.6837 47.1907 59.4742C47.4667 59.8359 47.7434 60.2885 47.7467 60.6828L47.7596 62.2295C47.3079 62.6175 46.3621 63.418 46.1931 63.5164C45.9818 63.6395 44.8923 63.9216 44.5903 64.0757C44.2882 64.2299 43.9237 64.1723 43.7729 64.2645C43.6221 64.3568 43.4142 64.9044 43.4152 65.0257L43.4185 65.42L43.0033 66.5457C42.3978 66.6821 41.1566 66.9553 41.0353 66.9563C40.8836 66.9576 40.338 66.9925 39.4261 66.7574C38.5142 66.5224 38.7555 66.3687 38.541 66.0975C38.3265 65.8263 38.177 66.1005 37.4491 66.1066C36.7212 66.1127 36.1438 65.9658 35.5966 65.8187C35.0493 65.6716 34.9572 65.5207 34.1955 65.1024C33.4338 64.6842 33.2194 64.4433 33.0619 63.747C32.936 63.19 33.2086 63.1493 33.3606 63.1986C33.5893 63.0758 33.9675 62.8709 34.2656 62.7049C33.1543 62.9868 31.9714 63.1476 31.7533 63.212C31.4145 63.3118 31.2462 63.014 31.2044 62.8526C30.9495 62.5918 30.421 62.0341 30.347 61.8891C30.2545 61.7079 30.6377 60.3702 30.8108 59.3072C30.9494 58.4568 33.6062 57.4742 34.9173 57.0892C35.0716 57.4014 35.3804 58.0559 35.3814 58.1773L35.3963 59.9666C35.7517 60.1558 36.44 60.7405 36.3498 61.5662C36.3367 61.6856 36.2709 61.7977 36.1639 61.9028C36.2321 61.8796 36.2956 61.8581 36.352 61.8392C36.6055 61.928 37.1737 62.172 37.4186 62.4369C37.7246 62.768 37.9352 62.5539 38.7257 62.79C39.5163 63.026 39.9995 62.7794 40.5757 62.7746C41.0367 62.7708 41.4121 62.4441 41.5422 62.2813L43.3831 61.1741C43.6339 60.9293 44.1337 60.2518 44.1275 59.4997C44.1197 58.5595 44.1793 58.4377 44.1159 58.1046C44.0524 57.7715 44.0186 57.3471 43.8642 57.0148C43.7097 56.6824 43.5551 56.3198 43.3397 55.9576C43.1675 55.6679 42.5738 55.0338 42.2985 54.753L40.5026 53.9794C40.159 54.0025 39.1933 54.1055 38.0791 54.3332Z"
            //       fill="#FFD029"
            //     />
            //     <path
            //       d="M33.8764 30.4375C31.2099 33.6626 32.2593 36.5777 33.1173 37.6321L33.6908 37.2937L37.4768 33.0159L42.0539 29.0349L40.1303 27.5041C39.1567 27.1381 36.5429 27.2124 33.8764 30.4375Z"
            //       fill="#FF3541"
            //     />
            //     <path
            //       d="M40.383 54.223C37.3182 53.3265 35.8049 55.6563 35.4313 56.9333L35.4528 59.5112C35.4604 60.4311 36.1982 62.3439 39.0881 62.6353C41.978 62.9267 43.5055 60.1215 43.908 58.6826C44.01 57.5696 43.4477 55.1195 40.383 54.223Z"
            //       fill="#FF3541"
            //     />
            //     <g opacity="0.15">
            //       <path
            //         d="M45.1166 43.568C47.721 41.6294 47.5276 39.2916 47.1054 38.3649L49.3233 38.8318L58.1094 41.3064L53.2376 42.6815L47.409 45.7024L43.626 50.344C43.2923 50.3367 42.5522 50.3287 42.2612 50.3554C41.8975 50.3888 41.4135 50.5444 40.2017 50.7062C39.9886 50.6169 39.0126 49.9578 38.5235 49.5069C38.0345 49.056 37.7018 49.1498 37.4891 49.1212C37.2764 49.0927 36.8542 49.3691 36.551 49.3717C36.2478 49.3742 36.0442 50.4374 35.7765 51.0766C35.5089 51.7158 35.2678 51.8998 35.0878 52.1439C34.9439 52.3392 34.8071 52.4293 34.7567 52.45C34.3547 52.7364 33.49 53.3097 33.2474 53.3118C33.0048 53.3138 32.3015 53.8454 31.9802 54.1109L31.1338 54.4516C31.033 54.3377 30.8928 54.1774 30.7518 54.0127L31.1394 55.1188L32.0138 58.1446C31.6124 58.5119 30.7749 59.4409 30.6358 60.2185C30.4619 61.1905 29.9844 62.1347 29.9248 62.2565C29.8771 62.354 28.2018 64.1716 27.3701 65.0682L26.0536 63.5929C26.877 62.9087 28.2259 60.0201 27.0349 53.9397C25.5461 46.3392 27.3119 43.5038 28.2664 41.5547C29.2208 39.6056 29.4697 36.7222 29.5673 33.8703C29.6649 31.0185 33.895 25.4328 39.1865 27.1176C36.5172 28.2924 31.3055 31.3263 31.8135 34.0639C32.3215 36.8016 32.8944 37.6238 33.1174 37.6927L31.9758 40.7023L33.8133 37.4746L36.4234 34.0256L40.4598 30.686C41.9686 29.7534 45.3002 27.7219 46.5564 27.0563C47.8125 26.3907 48.7175 26.7654 49.0129 27.0359C39.8305 31.6011 35.4806 38.583 34.4534 41.5032L37.6303 40.5669C31.064 44.6009 32.2743 48.1334 33.7002 49.3954C37.5229 45.8756 40.7626 48.8513 41.6654 47.9946C42.5682 47.1378 41.8611 45.9912 45.1166 43.568Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M66.2145 27.56C62.3507 26.8642 58.0373 27.7898 56.3636 28.3396L53.5651 27.362L55.4986 26.436L58.983 26.0127L62.1068 25.9867C65.086 26.801 70.0783 28.2558 66.2145 27.56Z"
            //         fill="black"
            //       />
            //       <path
            //         d="M80.5881 45.4263C79.4413 41.7477 74.1788 40.6268 71.6909 40.5262L70.5222 42.2344L74.892 42.5013L78.9724 44.4389C79.9887 46.3008 81.7348 49.105 80.5881 45.4263Z"
            //         fill="black"
            //       />
            //     </g>
            //     <path
            //       d="M47.4713 38.6349C50.2452 39.137 55.2197 40.2958 59.8131 41.9636M72.2057 40.4613C71.6813 41.0882 70.9926 41.8373 70.2822 42.5808M70.2822 42.5808C69.791 43.0949 69.2893 43.6064 68.8243 44.0731C67.9341 44.9664 66.534 45.0582 65.4314 44.4462C63.7787 43.5286 61.8327 42.6969 59.8131 41.9636M70.2822 42.5808C72.9861 41.8975 78.9884 42.0184 81.3673 47.9676C82.2575 43.168 80.7791 31.9581 69.5022 29.0361M72.5299 32.0267C70.2388 28.851 63.2924 23.417 53.8356 27.0868M56.5454 28.3381C54.5063 27.0706 49.4028 25.602 43.6921 28.445M31.2585 43.9563C31.2986 42.9162 31.7724 40.6629 33.4828 37.8842M40.4129 39.6642C36.4643 40.1925 28.7389 42.9642 29.4269 49.8253C29.6508 52.0582 30.3784 53.6707 31.3489 54.818M43.6921 28.445C44.2033 25.7212 43.2243 20.3204 35.2187 20.5083C25.3464 20.7401 20.2688 29.5809 19.2056 33.7581C19.1917 33.8127 19.257 33.8497 19.3012 33.8149C19.9439 33.3094 21.4778 32.3199 23.5406 31.5869C23.5951 31.5675 23.6429 31.6286 23.6079 31.6746C21.5484 34.3827 17.5849 40.637 17.1256 45.4488C17.1201 45.5072 17.1948 45.5346 17.2305 45.488C17.7915 44.7542 18.96 43.4205 20.098 42.7218C20.1475 42.6914 20.2044 42.744 20.1783 42.7959C18.9846 45.1726 17.2768 50.9936 19.3032 56.7976C19.321 56.8485 19.3924 56.851 19.4121 56.8008C19.8766 55.6173 20.9155 53.2168 21.8591 51.8107C21.8895 51.7653 21.9595 51.7818 21.9647 51.8362C22.2035 54.3313 23.6385 60.2403 27.6544 65.2743C27.6794 65.3056 27.7274 65.3039 27.7488 65.27C28.4957 64.087 30.0533 61.7436 30.6446 61.3103M43.6921 28.445C43.2506 28.6648 42.8054 28.9104 42.3578 29.1838M35.3387 56.8127C34.4665 57.0107 33.265 57.3921 32.2853 58.009M36.5917 61.5945C35.7306 62.3748 34.2076 63.1055 32.9038 63.0854M32.2853 58.009C31.0321 58.7983 30.142 59.9731 30.7687 61.6429C31.156 62.6749 31.9742 63.071 32.9038 63.0854M32.2853 58.009C31.274 56.7577 30.3944 53.839 34.9665 52.1753M36.2065 55.38C35.355 53.8908 34.1565 49.9462 37.5223 49.485C38.6265 49.3336 39.4142 50.0183 39.8512 51.0124M39.8512 51.0124C40.2533 51.9275 40.3577 53.0443 40.1386 54.0734M39.8512 51.0124C40.7181 50.4962 42.2072 50.0802 43.3576 50.7706M44.8651 53.4881C44.6326 52.0211 44.0578 51.1909 43.3576 50.7706M42.1775 54.9057C43.6529 53.6094 47.088 52.1654 48.5191 55.2169C49.1578 56.5787 48.1162 58.0139 46.6995 58.8865M44.0373 59.7127C44.8731 59.7285 45.8532 59.4079 46.6995 58.8865M42.6275 61.6049C42.9736 62.1627 43.3504 62.9586 43.4664 63.8424M38.0844 62.3707C37.8053 63.449 37.8387 64.8678 38.3812 65.9168M43.4664 63.8424C43.6765 65.4447 43.167 67.1961 41.0375 67.3506C39.6917 67.4483 38.848 66.8195 38.3812 65.9168M43.4664 63.8424C44.5695 64.0253 46.9005 64.0807 47.6383 62.3518C48.3761 60.6229 47.3197 59.3011 46.6995 58.8865M32.9038 63.0854C33.4378 64.5252 35.2808 67.1073 38.3812 65.9168M35.2073 59.2403C34.9052 59.3843 34.0535 59.8261 33.0638 60.441M33.625 54.9768C33.8692 55.1669 34.6314 55.6418 35.7264 56.0209M37.6953 52.0616L38.2897 54.2404M42.1583 52.6007L41.2012 54.2162M45.5545 56.1515C45.323 56.2747 44.5935 56.572 43.5276 56.7749M45.0829 61.4329C44.6982 61.2743 43.8309 60.8731 43.4388 60.5366M40.6021 62.4104C40.6043 62.6732 40.6894 63.4227 41.0123 64.3178M36.2767 63.8112L37.2332 62.1351M39.7537 62.5084L43.007 56.1727M43.6992 59.1696L36.5395 55.3166M35.8823 60.1749L39.1078 54.1426M37.5354 62.0113L41.2055 54.736M42.4443 61.4548L35.1909 57.2689M43.3576 50.7706C44.7068 47.72 49.8867 41.6877 59.8131 41.9636M42.3578 29.1838C41.9873 29.4102 41.6151 29.6556 41.2418 29.9213C37.3775 32.6717 34.9655 35.4754 33.4828 37.8842M42.3578 29.1838C41.1424 27.7078 38.2127 26.1494 34.3269 29.9788C30.416 33.833 32.3025 36.9901 33.4828 37.8842"
            //       stroke="black"
            //       stroke-width="1.1656"
            //       stroke-linecap="round"
            //     />
            //     <circle
            //       cx="39.5674"
            //       cy="58.3244"
            //       r="4.2461"
            //       transform="rotate(-0.476665 39.5674 58.3244)"
            //       stroke="black"
            //       stroke-width="1.1656"
            //     />
            //   </g>
            // </svg>
          )}

          <svg
            className="absolute z-10"
            width="113"
            height="113"
            viewBox="0 0 113 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M91.378 14.6205C101.378 22.939 108.069 34.5628 110.241 47.3879"
              stroke="#A3E3FF"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M64.13 2.52834C69.8912 3.33573 75.4848 5.06554 80.696 7.65134"
              stroke="#A3E3FF"
              stroke-width="3"
              stroke-miterlimit="10"
            />
            <path
              d="M111 56.5C111 67.2791 107.804 77.8161 101.815 86.7786C95.8266 95.741 87.3148 102.726 77.3563 106.851C67.3977 110.976 56.4396 112.056 45.8676 109.953C35.2956 107.85 25.5847 102.659 17.9627 95.0373C10.3407 87.4153 5.15012 77.7044 3.04723 67.1324C0.944333 56.5604 2.02361 45.6023 6.14859 35.6437C10.2736 25.6852 17.259 17.1734 26.2214 11.1849C35.1839 5.19637 45.7209 2 56.5 2"
              stroke="#3772FF"
              stroke-width="3"
              stroke-miterlimit="10"
            />
          </svg>
        </div>
        <div className="text-[25px] text-buffer-blue sm:text-f18">
          {address ? address.slice(0, 7) + '...' + address.slice(-7) : '-'}
        </div>
      </div>

      {/* right side */}
      <div className="bg-2 px-7 py-[20px] rounded-lg flex items-stretch justify-between w-fit ">
        <Col
          head={'Daily Rank'}
          desc={dailyRank}
          headClass={'text-f14'}
          descClass={'text-f16 text-buffer-blue'}
        />
        <Separator />
        <Col
          head={'Weekly Rank'}
          desc={weeklyRank}
          headClass={'text-f14'}
          descClass={'text-f16 text-buffer-blue'}
        />
      </div>
    </div>
  );
};

const Separator = () => {
  return <div className="w-1 h-auto bg-cross-bg mx-5"></div>;
};
