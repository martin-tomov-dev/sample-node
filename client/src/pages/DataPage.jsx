import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../data.config.json";
import Datatable from "../components/Datatable";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import { FilterContext } from "../context/FilterContext";

function DataPage() {
  const [matchData, setMatchData] = useState([]);
  const [unfilterdData, setUnfilterdData] = useState([]);
  const [game, setGame] = useState("NBA");
  const { fetchData } = useFetch();
  const { filters } = useContext(FilterContext);

  const main = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const configData = config.DataPage;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    fetchData({
      url:
        "https://splitaction.azurewebsites.net/api/getAggregatedData?sport=" +
        game,
      method: "GET",
    }).then((result) => {
      if (result.status) {
        setMatchData(result.data);
        setUnfilterdData(result.data);
      }
    });
  }, [fetchData, game]);

  const applyFilters = () => {
    let filteredData = unfilterdData.filter((match) => {
      let show_match = false;
      match[Object.keys(match)[0]].forEach((match_detail) => {
        show_match =
          show_match ||
          (filters.spread.bets.min <= match_detail.SpreadBets &&
            match_detail.SpreadBets <= filters.spread.bets.max &&
            filters.spread.handled.min <= match_detail.SpreadHandled &&
            match_detail.SpreadHandled <= filters.spread.handled.max &&
            filters.moneyline.bets.min <= match_detail.MoneylineBets &&
            match_detail.MoneylineBets <= filters.moneyline.bets.max &&
            filters.moneyline.handled.min <= match_detail.MoneylineHandled &&
            match_detail.MoneylineHandled <= filters.moneyline.handled.max &&
            filters.total.bets.min <= match_detail.TotalBets &&
            match_detail.TotalBets <= filters.total.bets.max &&
            filters.total.handled.min <= match_detail.TotalHandled &&
            match_detail.TotalHandled <= filters.total.handled.max);
      });
      return show_match;
    });
    setMatchData(filteredData);
  };

  return (
    <div className="relative w-full h-fit">
      <div
        className="w-full h-fit min-h-screen bg-black sm:pt-4 text-[#3cdf1f] relative"
        ref={main}
      >
        <div className="">
          {/* <div className="flex justify-between">
            <h1 className="sm:text-5xl text-3xl font-bold my-2 sm:pl-8 pl-4 py-2 cursor-pointer"
              onClick={() => { navigate('/') }} >Split Action</h1>
          </div> */}
          <img src="/imgs/header.JPG" className="w-full" />

          <div className="bg-gradient-to-r from-[#3cdf1f] to-gray-900 h-10 w-full text-white rounded justify-end flex">
            <button
              className="mr-4 text-[#3cdf1f] font-bold hover:opacity-70"
              onClick={() => {
                navigate("/page-three");
              }}
            >
              How to Use
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="w-full flex justify-center items-center h-full">
            <span class="loader top-80"></span>
          </div>
        ) : (
          <div className="lg:flex sm:py-8 py-4">
            <div className="lg:w-2/3 md:flex">
              <div className="md:w-1/4 h-fit sm:mx-6 mx-2 my-2 h-[600px] bg-[#111] p-4 text-sm text-[#888] mt-2 sm:mt-8">
                <h1 className="text-center text-lg font-[500] mt-2">News</h1>
                Profitable sports bettors look for good value opportunities in
                wagers and use a variety of data to make their decisions. WYG
                provides some of the data critical to this decision process. WYG
                provides consensus data in a clean table to filter and download
                for future analysis while other sites present this data in a
                confusing format. Again, use this data as you deem appropriate
                with your other analysis.
              </div>
              <div className="md:w-3/4 mx-2">
                <div>
                  <p className="font-[500] sm:text-2xl text-xl">
                    Up Your Game on Sports Wagering.
                  </p>
                  <p className="text-base sm:text-lg mt-2">
                    What direction is crowd going? Where is the “sharp” money?
                    WYG provides free, easily-understandable, and valuable
                    information will help you make better decisions and payouts.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  <a
                    href={configData?.middleBanners[0].href}
                    target="_blank"
                    className="flex text-center justify-center mr-2 h-fit my-2 rounded-lg min-w-56 w-full cursor-pointer relative"
                  >
                    <img
                      src={configData?.middleBanners[0].src}
                      className="w-2/3 sm:w-[250px] aspect-ratio rounded"
                      alt=""
                    />
                  </a>
                  <a
                    href={configData?.middleBanners[1].href}
                    target="_blank"
                    className="flex text-center justify-center mr-2 h-fit my-2 rounded-lg min-w-56 w-full cursor-pointer relative"
                  >
                    <img
                      src={configData?.middleBanners[1].src}
                      className="w-2/3 sm:w-[250px] aspect-ratio rounded"
                      alt=""
                    />
                  </a>
                </div>
                <Datatable
                  matches={matchData}
                  applyFilters={applyFilters}
                  setGame={setGame}
                  game={game}
                />
                <div className="text-white mt-6 p-4 rounded text-sm sm:text-base text-justify">
                  WYG provides valuable sports wagering consensus data to
                  utilize along with your other sports analysis.
                  <br />
                  <br />
                  When is it best to wager with or against the public (betting
                  count) or whales (large dollar volume)?
                  <br />
                  <br />
                  The public commonly makes sports picks based upon overwhelming
                  favorites, favorite team, most recent performance, home team
                  advantage, social media and / or biased by favorite players.
                  Also, teams with larger fan base may also skew the wagering
                  odds (think New York Yankees vs Tampa Devil Rays). Frequently,
                  the public will make the wagers based upon “feeling” while
                  ignoring facts in opposition. As result, the lines commonly
                  over-react to the wagering activity and adjust from the line
                  open to game-time. An observant and patient bettor can use
                  this information to get more favorable odds as sportsbooks
                  typically adjust their lines in attempt to encourage more
                  bettors to take opposing positions to balance out the bettors.
                  <br />
                  <br />
                  Wagering against the public (aka “fading”) is popular strategy
                  as the theory is “the public is always wrong”. While there is
                  some evidence to support the public’s poor betting record
                  (sportsbooks would not exist if the public were consistently
                  accurate), it is not always the case and each sporting event
                  should be evaluated under its own conditions as many other
                  factors can affect the outcome. Injuries, matchups, change in
                  lineups, weather, and unpredictable plays can all play a
                  factor into the final score. Based upon your analysis, If you
                  wish to wager with the public – it might be best to lock-in
                  that wager early. However, if “fading” the public your
                  patience may be rewarded with better odds / payout, if you
                  wait closer to gametime.
                  <br />
                  <br />
                  The general public prefers to bet on favorites and high
                  scoring events – afterall, its more exciting…..who wants to
                  watch a boring game? The lesser popular wager is to expect the
                  underdog to play a close game or upset. Use consensus, along
                  with your other analysis, to find good-value wagers.
                  <br />
                  <br />
                  Pay attention to the moneyline consensus vs spread consensus.
                  “Sharp” bettors may be influencing the spread. If the line
                  moves in opposition of the expected change in odds and / or
                  moves quickly, it typically due to a large wager(s). Take this
                  into consideration. Also, check other sportsbooks to see if
                  you can capture a line that has not quickly reflected these
                  changes in line movement.
                  <br />
                  <br />
                  Profitable sports bettors look for good value opportunities in
                  wagers and use a variety of data to make their decisions. WYG
                  provides some of the data critical to this decision process.
                  WYG provides consensus data in a clean table to filter and
                  download for future analysis while other sites present this
                  data in a confusing format. Again, use this data as you deem
                  appropriate with your other analysis.
                  <br />
                  <br />
                  You are minutes away from participating in the action. Open an
                  account within 15 minutes with the sportsbooks above to place
                  your smart, logic-based, informed wagers.
                  <br />
                  <br />
                  Good luck and stay in-the-green.
                </div>
              </div>
            </div>
            <div className="sm-full md:w-3/4 float-right lg:w-1/3 lg:mx-6 lg:block grid lg:grid-cols-1 grid-cols-2 text-[#aaa] mt-8">
              {configData?.rightBanners?.map((val, ind) => (
                <div className="m-2 flex" key={ind}>
                  <a
                    href={val.href}
                    target="_blank"
                    className="sm:flex items-center mx-2 h-fit rounded-lg min-w-56 w-full cursor-pointer md:flex"
                  >
                    <img
                      src={val?.src}
                      className=" aspect-square rounded mx-auto w-full sm:w-[125px] h-auto sm:h-[125px]"
                      alt=""
                    />
                    <p className="p-2 md:p-4 text-xs sm:text-sm text-justify">
                      {val?.text}
                    </p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            <div className="w-full justify-center text-white text-justify">
              <div className="p-4 md:w-1/2 mx-auto">
                <p className="text-2xl sm:text-3xl text-center">Disclaimer</p>
                <p className="border border-[#3cdf1f] p-4 mt-2 text-sm sm:text-base">
                  WYG is not a sportsbook operator but rather an informational
                  site regarding sports betting for entertainment purposes.
                  Sports wagering laws vary by situs and change continuously.
                  WYG does not provide any information as to the legalities in
                  your location. Users of data and advertising links are
                  strongly suggested to make their own inquiry into the legality
                  of using this information. WYG assumes no liability for the
                  usage of the data, nor its advertising links.
                  <br />
                  <br />
                  The pre-vetted vendors of the products and services offered by
                  WYG are proven to be reliable and trustworthy. WYG may (or may
                  not) be supported by the vendors. Vendors will periodically
                  change. There is no charge to view any of the products /
                  services.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-[#3cdf1f] to-gray-900 h-10 w-full text-white rounded mt-5"></div>
            <div className="mt-5">
              <div className="w-full justify-center text-white from-[#3cdf1f] to-gray-900 text-white rounded">
                <div className="sm:text-base py-2 text-sm p-4 mx-auto text-left sm:w-2/3 text-yellow-200 text-center">
                  <p>Wager responsibly.</p>
                  Any tips, suggestions or comments for WYG??, email us at{" "}
                  <a href="#" className="text-red-500">
                    support@whoyagot.net
                  </a>
                  <p className="mt-4">Gambling Problem?? 1-800-GAMBLER.</p>
                  <p>
                    Published by Who Ya Got?? @Copyright2022 All rights
                    reserved.
                  </p>
                  <p>
                    Designated branding and trademarks by Who Ya Got and its
                    vendors are the property of their respective owners.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DataPage;
