import { useState, useEffect } from "react";
import useMiscAPI from "../api/useMiscAPI";
import bannerLeftIcon from "../../assets/banner-left.png";
import bannerRightIcon from "../../assets/banner-right.png";

export default function PromoBanners() {
  const [banners, setBanners] = useState();
  const { getActiveBanners } = useMiscAPI();

  let currentBanner = 0;
  let bannerCount;
  let pages;

  useEffect(() => {
    async function fetchActiveBanners() {
      const activeBanners = await getActiveBanners();
      if (activeBanners) {
        setBanners(mapActiveBanners(activeBanners));
      }
    }
    fetchActiveBanners();
  }, []);

  useEffect(() => {
    let pageSlider = setInterval(() => move(1), 5000);
    return () => clearInterval(pageSlider);
  });

  if (banners) {
    bannerCount = banners.length;
    pages = generatePages();
  }

  function mapActiveBanners(activeBanners) {
    return activeBanners.map((banner) => (
      <div className="banner" key={banner.id}>
        <a href={banner.banner_link}>
          <img className="banner-img" src={banner.image_link} alt={banner.name} />
        </a>
      </div>
    ));
  }

  function move(transition) {
    document.querySelector(`.page${currentBanner}`).style.opacity = "10%";
    currentBanner += transition;
    cycleBanner();
    document.querySelector(`.page${currentBanner}`).style.opacity = "20%";
    updateSlider();
  }

  function cycleBanner() {
    if (currentBanner < 0) {
      currentBanner = bannerCount - 1;
    } else if (currentBanner >= bannerCount) {
      currentBanner = 0;
    }
  }

  function updateSlider() {
    const bannerImageWidth = document.querySelector(".banner-img").clientWidth
    const translation = currentBanner * (-1 * bannerImageWidth);
    document.querySelector(
      ".active-banners"
    ).style.translate = `${translation}px`;
  }

  function generatePages() {
    pages = [];
    for (let i = 0; i < bannerCount; i++) {
      let pageClass = `page-dot page${i}`;
      pages.push(<span className={pageClass} key={i}></span>);
    }
    return pages;
  }

  return (
    <div className="promo-banners flex-row justify-center">
      <div className="slider box-shadow">
        <div className="active-banners flex-row">{banners}</div>
        <img
          className="banner-btns prev"
          src={bannerLeftIcon}
          onClick={() => move(-1)}
        />
        <img
          className="banner-btns next"
          src={bannerRightIcon}
          onClick={() => move(1)}
        />
        <div className="pages flex-row justify-center">{pages}</div>
      </div>
    </div>
  );
}
