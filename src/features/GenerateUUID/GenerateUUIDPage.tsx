import React, { useEffect, useState } from 'react'
import { CiSettings } from 'react-icons/ci';
import { ImMagicWand } from 'react-icons/im'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { LuCopy } from 'react-icons/lu'
import { settingsStore } from '../../store/storeSettings';
import { Features } from '../features.enum';
import { UUIDGenerated, uuidv4Store } from '../../store/uuidStore';


export default function GenerateUUIDPage() {

    const [list, setList] = useState<UUIDGenerated[]>([])
    const listDataStorage = uuidv4Store((state) => state.list);
    const addRecordsToStorage = uuidv4Store((state) => state.addRecords);

    const [lastCopy, setLastCopy] = useState<UUIDGenerated>()
    const settings = settingsStore((state) => state.settings)
    const setFeatureAutoCopy = settingsStore((state) => state.setFeatureAutoCopy)
    const setFeatureStoreHistory = settingsStore((state) => state.setFeatureStoreHistory)
    const autoCopy = settingsStore((state) => state.isFeatureAutoCopy(Features.UUID_GENERATOR_V4))
    const isStoreHistory = settingsStore((state) => state.isFeatureStoreHistory(Features.UUID_GENERATOR_V4))

    function copySelectedValue(uuidObject: UUIDGenerated) {
        navigator.clipboard.writeText(uuidObject.value).then(() => {
            setLastCopy(uuidObject);
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }
    function copyUUIDHandler(index: number, item: UUIDGenerated) {
        const newList = [...list];
        newList[index].copied = true;
        setList(newList);
        copySelectedValue(item)
        storeRecordsToStore(newList);
    }
    function checkChecked() {
        return settings.featureOpenOnLoad === Features.UUID_GENERATOR_V4 ? true : false;
    }
    function storeRecordsToStore(list: UUIDGenerated[] = []) {
        if (isStoreHistory) {
            addRecordsToStorage(list);
        }
    }

    function generateHandler() {
        const uuid = crypto.randomUUID();

        const newUUIDObj = {
            value: uuid,
            copied: autoCopy,
            generatedAt: new Date()
        }

        if (autoCopy) {
            copySelectedValue(newUUIDObj);
        }

        const newList = [newUUIDObj, ...list];
        storeRecordsToStore(newList);

        setList(() => {
            return newList;
        });
    }
    function handlerSetFeatureAutoCopy(value: boolean) {
        setFeatureAutoCopy(Features.UUID_GENERATOR_V4, value)
    }
    function handlerSetStoreHistory(value: boolean) {

        setFeatureStoreHistory(Features.UUID_GENERATOR_V4, value)
        if (!value) {
            addRecordsToStorage([])
        } else {
            addRecordsToStorage(list)
        }
        //setFeatureAutoCopy(Features.UUID_GENERATOR_V4, value)
    }
    function changeOnLoad(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            settingsStore.setState({ settings: { ...settings, featureOpenOnLoad: Features.UUID_GENERATOR_V4 } })
        } else {
            settingsStore.setState({ settings: { ...settings, featureOpenOnLoad: '' } })
        }
    }
    useEffect(() => {
        if (listDataStorage.length > 0) {
            setList(listDataStorage);
            let lastCopied = listDataStorage.find((item) => item.copied);
            setLastCopy(lastCopied);
        }
    }, [])
    return (
        <div>
            <div className='p-4 border-1 border-base-300 rounded-box flex w-full flex-col'>
                <div className='mb-2'>
                    <h3 className="text-lg font-bold mb-4 flex gap-2">UUID Generator</h3>
                    <div className='flex gap-4 items-center justify-between'>
                        <div className="relative group cursor-pointer">
                            <div
                                className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200">
                            </div>
                            <div
                                className="relative  bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                                <div className="space-y-2">
                                    <button className="btn btn-warning " onClick={generateHandler}>
                                        <ImMagicWand size={20} />
                                        Generate</button>
                                </div>
                            </div>
                        </div>


                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-secondary m-1"> <CiSettings size={20} />
                                Options</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li>
                                    <label className="fieldset-label">
                                        <input id='autoCopy' type="checkbox" checked={autoCopy} onChange={(e) => { handlerSetFeatureAutoCopy(e.target.checked) }} className="checkbox checkbox-md " />
                                        Auto Copy
                                    </label>
                                    <label className="fieldset-label">
                                        <input type="checkbox" checked={checkChecked()} onChange={changeOnLoad} className="checkbox" />
                                        Open on Load
                                    </label>
                                    <label className="fieldset-label">
                                        <input type="checkbox" checked={isStoreHistory} onChange={(e) => { handlerSetStoreHistory(e.target.checked) }} className="checkbox" />
                                        Store History
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="overflow-x-auto overflow-y-auto table-container">
                <table className="table table-xs table-zebra">
                    <tbody>
                        {lastCopy &&
                            <tr className=' text-success'>
                                <td>
                                    <button disabled={true} className="btn btn-square">
                                        <LuCopy size={25} />
                                    </button>
                                </td>
                                <th className='w-full text-md'>
                                    {lastCopy.value}
                                </th>
                                <th className=''>
                                    <span className='flex gap-2 items-center text-nowrap'><IoCheckmarkOutline size={25} /> Last Copy</span>
                                </th>

                            </tr>
                        }

                        {list.map((item, index) =>
                            <tr key={index} className='hover:bg-base-300!'>
                                <td>
                                    <button className="btn btn-square" onClick={() => { copyUUIDHandler(index, item) }}>
                                        <LuCopy size={25} />
                                    </button>
                                </td>
                                <th className='w-full text-md'>
                                    {item.value}
                                </th>
                                <th >
                                    {item.copied ? <span className='flex gap-2 items-center text-success text-right'><IoCheckmarkOutline size={25} /> Copied</span> : null}
                                </th>
                            </tr>
                        )}
                    </tbody>


                </table>
            </div>
        </div>
    )
}
