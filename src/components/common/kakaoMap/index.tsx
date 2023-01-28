import styled from "@emotion/styled";
import { useEffect } from "react";
import Head from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IMapProps {
  address: string;
  routerId?: string;
  setValue?: any;
}

const KakaoMapLauncher = ({ setValue, address, routerId }: IMapProps) => {
  // const onClickMap = (mouseEvent: MouseEvent) => {
  //   setPosition({
  //     latitude: mouseEvent?.latLng.getLat(),
  //     longitude: mouseEvent?.latLng.getLng(),
  //   });
  // };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=5b7901e11a2918607324eecf01a56e00&libraries=services";
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;
      kakao.maps.load(() => {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //  지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, //  지도의 레벨(확대, 축소 정도)
        };

        const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, function (result: any, status: any) {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });
            if (!routerId) {
              setValue("useditemAddress.lat", coords.Ma);
              setValue("useditemAddress.lng", coords.La);
            }

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
            marker.setMap(map);
          }
        });

        // const markerPosition = new kakao.maps.LatLng(
        //   position?.latitude,
        //   position?.longitude
        // );
        // const marker = new kakao.maps.Marker({
        //   map,
        //   position: markerPosition,
        // });
        // kakao.maps.event.addListener(map, "click", onClickMap);
      });
    };
  }, [address]);
  return (
    <>
      <Head></Head>
      <MapBox id="map"></MapBox>
    </>
  );
};

export default KakaoMapLauncher;

const MapBox = styled.div`
  min-width: 400px;
  width: 100%;
  max-height: 480px;
  height: 100%;
`;
