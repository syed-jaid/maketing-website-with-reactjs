import React, { useEffect, useState } from "react";
import Footer from "../core/footer";
import { useParams } from "react-router-dom";
import Loading from "../checkout/Loading";

const ThankYouPage = () => {
  const [show, setshow] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const data = localStorage.getItem("payment");
    if (data) {
      setshow(true);
    } else {
      window.history.back();
    }
  }, []);
  return (
    <>
      {!show ? (
        <Loading />
      ) : (
        <div>
          <div className="bg-[#e73904] flex items-center  justify-center h-[120px]">
            <h1 className="text-center font-bold text-[50px] text-white">
              Congratulations - order Complete!
            </h1>
          </div>
          <p className=" flex items-center  justify-center text-3xl pt-5">
            Kindly <p className="font-bold ml-3"> check your email</p>! You
            should receive it within 2-5 minutes!
          </p>
          <div className=" flex items-center  justify-center text-3xl pt-3">
            - OR -
          </div>
          <div className=" flex items-center  justify-center text-3xl pt-3">
            {" "}
            You can{" "}
            <span className="font-bold text-[#188bf6] ml-2 mr-2 hover:underline">
              click here
            </span>{" "}
            to directly access your{" "}
            <span className="font-bold text-[#188bf6] ml-2 mr-2 hover:underline">
              Bonuses{" "}
            </span>
          </div>

          <div className="my-5 max-w-[1160px] mx-auto">
            <iframe
              width="1140"
              height="606"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Use your video's embed link
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

          <div className="max-w-[1160px] mx-auto text-3xl pt-3 text-center">
            If you've any more questions, just drop us an email at{" "}
            <span className="text-[#188bf6] ml-2 mr-2 hover:underline ">
              support@aitoolkitsforcoaches.com{" "}
            </span>{" "}
            and we will take care of you.
          </div>
          <div className="max-w-[1160px] mx-auto text-3xl pt-3 text-center my-[20px]">
            If you want to build your funnels and get more clients online, you
            can{" "}
            <span className="font-bold text-[#188bf6] ml-2 mr-2 hover:underline">
              Click The Button Below
            </span>{" "}
            to schedule a{" "}
            <span className="underline">FREE Consultation Call</span> with our
            team👇
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="bg-[#e73904] w-[732px] h-[111] rounded-3xl p-3 text-white flex items-center  justify-center">
              <h1 className="  font-bold text-[30px] ">
                BOOK A FREE CONSULTATION CALL <br />
                <p className="font-normal text-[20px] text-center">
                  {" "}
                  Schedule call with us
                </p>
              </h1>
            </div>
          </div>

          <div className="flex gap-[20px] max-w-[1160px] mx-auto mt-[100px]">
            <div className="max-w-[360px] max-h-[527px] img-card px-[30px] py-[20px] rounded-[15px]">
              <img
                className="mt-[-45px]"
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/3cfYZ62ndd3Fci44OcL9/media/6586a959096557121a878ed8.png"
                alt=""
              />
            </div>
            <div className="max-w-[360px] max-h-[527px] img-card px-[30px] py-[20px] rounded-[15px]">
              <img
                className="mt-[-45px]"
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/3cfYZ62ndd3Fci44OcL9/media/6587dd4609655731c593bec2.png"
                alt=""
              />
            </div>
            <div className="max-w-[360px] max-h-[527px] img-card px-[30px] py-[20px] rounded-[15px]">
              <img
                className="mt-[-45px]"
                src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/3cfYZ62ndd3Fci44OcL9/media/6586ac0bb3a8812b084ee5d5.png"
                alt=""
              />
            </div>
          </div>

          <img
            className="mx-auto mt-[50px]"
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/q6v8KZiyDpfUjDKoCW7u/media/651018c955d7d85166084339.png"
            alt=""
          />
          <img
            className="mx-auto mt-[50px]"
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/3cfYZ62ndd3Fci44OcL9/media/658be46525e0d6bcc09d24ec.png"
            alt=""
          />
          <img
            className="mx-auto mt-[20px]"
            src="https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://assets.cdn.filesafe.space/q6v8KZiyDpfUjDKoCW7u/media/651018c9088ee71d6478686d.jpeg"
            alt=""
          />

          <div className="flex items-center justify-center py-2">
            <div className="bg-[#e73904] w-[732px] h-[111] rounded-3xl p-3 text-white flex items-center  justify-center">
              <h1 className="  font-bold text-[30px] ">
                BOOK A FREE CONSULTATION CALL <br />
                <p className="font-normal text-[20px] text-center">
                  {" "}
                  Schedule call with us
                </p>
              </h1>
            </div>
          </div>

          <div className="max-w-[936px] rounded-[15px] mx-auto bg-[#252a2f] px-[30px] py-[20px]">
            <p className="text-[#e93d3d] text-[25px] font-bold text-center">
              WHY WAIT?
            </p>
            <p className="text-white text-[45px] font-bold text-center">
              Discover How To Make $3k-$5k A Month Get More Leads & Sales With
              High-Converting Funnels 👇
            </p>
            <p className="text-white text-[35px] italic font-bold text-center">
              Schedule a Free Consultation Call!
            </p>
            <div className="bg-[#e73904] my-[30px] rounded-3xl p-3 text-white flex items-center  justify-center">
              <h1 className="  font-bold text-[30px] ">
                BOOK A FREE CONSULTATION CALL
              </h1>
            </div>
            <p className="text-white text-[20px] text-center">
              Ride the A.I. wave and profit from this rare opportunity!
            </p>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ThankYouPage;
