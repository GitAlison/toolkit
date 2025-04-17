import { CiBoxList } from "react-icons/ci";
import { PiHeartFill } from "react-icons/pi";
import { JSX, useEffect, useState } from "react";
import ListFeatures, { FEATURES_LIST } from "./features/ListFeatures";
import { GrTools } from "react-icons/gr";
import { settingsStore } from "./store";


function App() {
  const [tab, setTab] = useState("favorites");

  const [selectedFeatureElement, setSelectedFeatureElement] = useState<JSX.Element>();
  const settings = settingsStore((state) => state.settings)
  const [modalIsOpen, setOpenModal] = useState(false)

  function selectFeatureElement(featureElement: JSX.Element) {
    setSelectedFeatureElement(featureElement);
    setOpenModal(true)

  }

  useEffect(() => {
    if (settings.featureOpenOnLoad) {
      let feature = FEATURES_LIST.find((item) => item.feature === settings.featureOpenOnLoad);
      if (feature) {
        setSelectedFeatureElement(feature.featurePage);
        setOpenModal(true);

      }
    }
  }, [])

  return (
    <div >
      <div className="p-4 pb-17">
        <h3 className="text-lg font-bold ml-4 mb-4 flex gap-2" ><GrTools size={30} />Toolkit Helper</h3>
        <div className="tabs tabs-lift">
          <label className="tab">
            <input type="radio" name="favorites" checked={tab == 'favorites' ? true : false} onChange={() => { setTab('favorites') }} />
            <PiHeartFill size={20} className="mr-2" /> Favorites
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-4">
            <ListFeatures onlyFavorites={true} onSelectFeature={selectFeatureElement} />
          </div>
          <label className="tab">
            <input type="radio" name="all-tools" checked={tab == 'all-tools' ? true : false} onChange={() => { setTab('all-tools') }} />
            <CiBoxList size={20} className="mr-2" /> All Tools
          </label>
          <div className="tab-content bg-base-100 border-base-300 p-4">
            <ListFeatures onSelectFeature={selectFeatureElement} />
          </div>
        </div>

        <input type="checkbox" checked={modalIsOpen} onChange={e => setOpenModal(e.target.checked)} id='modal-feature' className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box md:w-11/12 md:max-w-5xl md:h-9/10 md:max-h-9/10 max-h-screen h-screen w-full">
            <form method="dialog">
              <label htmlFor='modal-feature' className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</label>
            </form>
            {selectedFeatureElement}
          </div>
          <label className="modal-backdrop" htmlFor='modal-feature'>Close</label>
        </div>
      </div>
      <footer className="footer sm:footer-horizontal footer-center bg-base-100 text-base-content p-4 fixed bottom-0">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Alison Aguiar</p>
        </aside>
      </footer>
    </div>
  )
}

export default App
