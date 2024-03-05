import { useCallback, useState } from "react";
import ngMusicLogo from "./assets/logo.svg";
import ngMusicTitle from "./assets/ngmusic.svg";
import currencyLogo from "./assets/currency-dollar.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Chip, Input, Typography } from "@material-tailwind/react";
import { LIMIT_QUERY, missingObj } from "./Util";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { MusicData, useMusicList } from "./api/query";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  const [searchData, setSearchData] = useState<string | undefined>();
  const [page, setPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState(false);
  const [dataFix, setDataFix] = useState<MusicData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchAction = useCallback(
    ({ dataMusic }: { dataMusic: MusicData[]; pageMusic: number }) => {
      const temp = dataMusic || [];
      setDataFix(temp);
      setHasMore(temp.length % LIMIT_QUERY === 0);
    },
    []
  );

  const { isLoading } = useMusicList({ search: searchData, page, fetchAction });

  const submitForm = async ({ search }: { search: string }) => {
    setSearchData((prev) => {
      if (prev !== search) {
        setPage(1);
      }
      return search;
    });
    setOpenModal(false);
  };

  const formik = useFormik({
    enableReinitialize: !!searchData,
    initialValues: {
      search: searchData as string,
    },
    onSubmit: (values) => submitForm(values),
    validationSchema: Yup.object().shape({
      search: Yup.string()
        .min(3, "minimal 3 characters")
        .required("Search is required"),
    }),
  });

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  if (!searchData) {
    return (
      <div className="min-h-screen relative flex flex-col justify-center items-center bg-gradient-to-b from-deep-purple to-mid-purple">
        <img src={ngMusicLogo} className="logo" alt="Music Logo" />
        <div className="absolute bottom-6 left-6 right-6">
          <form onSubmit={handleSubmit} className="flex justify-center w-full">
            <div className="flex flex-col gap-[15px] w-full md:w-3/5">
              <Input
                crossOrigin={undefined}
                type="text"
                id="search"
                name="search"
                data-testid={"search-form"}
                label="Artist / Album / Title"
                placeholder="Artist / Album / Title"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.search}
                labelProps={{
                  className: "hidden",
                }}
                className="font-normal text-center placeholder:text-xs !bg-[#FFFFFF] !rounded-[20px] border-none"
                required={true}
                error={typeof errors.search === "string" && touched.search}
                success={errors.search === undefined && touched.search}
              />
              <Button
                {...missingObj}
                variant="filled"
                type="submit"
                data-testid={"submit-form"}
                className="bg-white/20 !rounded-[20px]"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLoadMore = () => setPage((page) => page + 1);

  return (
    <div className="min-h-screen flex flex-col gap-[36px] bg-[#f8fafc] w-full">
      {isLoading && page === 1 ? <LoadingSpinner /> : null}
      <header className="min-h-[60px] mb-[39px] pt-[18px] px-[15px] pb-[22.2px] shadow-new bg-gradient-to-r from-deep-purple to-mid-purple">
        <div className="flex justify-between align-middle">
          <Bars3Icon strokeWidth={2} className="w-4 h-4 text-white" />
          <img src={ngMusicTitle} className="logo" alt="Music Logo" />
          <MagnifyingGlassIcon
            strokeWidth={2}
            className="w-4 h-4 text-white"
            onClick={handleOpenModal}
          />
        </div>
      </header>
      <div className="flex justify-center w-full">
        <div className="flex flex-col gap-[36px] w-full md:w-3/5">
          <div className="flex justify-center items-center gap-[10px] w-full">
            <Typography {...missingObj} className="text-[#334155] text-sm">
              Search result for:
            </Typography>
            <Typography
              {...missingObj}
              className="text-[#7b34dd] text-lg font-bold"
            >
              {searchData}
            </Typography>
          </div>
          <div className="flex justify-center px-4">
            <div className="flex flex-col min-w-full gap-[20px]">
              {dataFix.map((data) => (
                <div
                  key={`${data.artistId}-${data.trackId}-${data.collectionId}`}
                  className="p-3 rounded-[10px] bg-white shadow-card w-full"
                >
                  <div className="flex gap-3 w-full">
                    <img
                      className="h-[100px] w-[100px] object-cover object-center"
                      src={data.artworkUrl100}
                      alt="track"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div className="flex flex-col gap-[5px] w-full">
                        <Typography
                          {...missingObj}
                          className="text-base md:text-xs text-[#334155] font-medium"
                        >
                          {data.artistName}
                        </Typography>
                        <Typography
                          {...missingObj}
                          className="text-lg md:text-sm text-[#334155] font-bold"
                        >
                          {data.trackName}
                        </Typography>
                      </div>
                      <div className="flex justify-between items-center">
                        <Chip
                          value={data.primaryGenreName}
                          className="rounded-[10px] bg-[#10b981]"
                        />
                        <div className="flex items-center gap-[5px]">
                          <img
                            src={currencyLogo}
                            className="logo"
                            alt="Music Logo"
                          />
                          <Typography
                            {...missingObj}
                            className="text-xs font-bold text-[#f5b014]"
                          >
                            {data.trackPrice}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {hasMore ? (
                <div className="flex justify-center">
                  <Button
                    {...missingObj}
                    className="bg-[#e2e8f0] mb-[20px] text rounded-[18px]"
                    loading={isLoading && page > 1}
                  >
                    <Typography
                      {...missingObj}
                      className="text-[#64748b] text-xs font-medium"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </Typography>
                  </Button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      {openModal ? (
        <div className="absolute bg-dark-backdrop z-10 min-h-screen w-full flex items-center justify-center">
          <div className="absolute top-[18px] right-[18px]">
            <XMarkIcon
              strokeWidth={2}
              className="w-4 h-4 text-white"
              onClick={handleCloseModal}
            />
          </div>
          <div className="flex flex-col w-full gap[15px] px-[30px]">
            <Typography
              {...missingObj}
              className="text-xl font-bold text-center text-white"
            >
              Search
            </Typography>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-[15px] w-full">
                <Input
                  crossOrigin={undefined}
                  type="text"
                  id="search"
                  name="search"
                  data-testid={"search-form"}
                  label="Artist / Album / Title"
                  placeholder="Artist / Album / Title"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.search}
                  labelProps={{
                    className: "hidden",
                  }}
                  className="font-normal text-center placeholder:text-xs !bg-[#FFFFFF] !rounded-[20px] border-none"
                  required={true}
                  error={typeof errors.search === "string" && touched.search}
                  success={errors.search === undefined && touched.search}
                />
                <Button
                  {...missingObj}
                  variant="filled"
                  type="submit"
                  data-testid={"submit-form"}
                  className="bg-gradient-to-r from-deep-purple to-mid-purple !rounded-[20px]"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
