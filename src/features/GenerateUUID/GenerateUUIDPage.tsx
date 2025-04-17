import React, { useState } from 'react'
import { CiSettings } from 'react-icons/ci';
import { ImMagicWand } from 'react-icons/im'
import { IoCheckmarkOutline } from 'react-icons/io5'
import { LuCopy } from 'react-icons/lu'
import { settingsStore } from '../../store';
import { Features } from '../features.enum';


interface GeneratedValue {
    value: string;
    copied: boolean;
    generatedAt: Date;
}

export default function GenerateUUIDPage() {

    const [list, setList] = useState<GeneratedValue[]>([])
    const [lastCopy, setLastCopy] = useState<GeneratedValue>()
    const [autoCopy, setAutoCopy] = useState(false);
    const settings = settingsStore((state) => state.settings)

    function copySelectedValue(uuidObject: GeneratedValue) {
        navigator.clipboard.writeText(uuidObject.value).then(() => {
            setLastCopy(uuidObject);
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    }

    function copyUUIDHandler(index: number, item: GeneratedValue) {
        const newList = [...list];
        newList[index].copied = true;
        setList(newList);
        copySelectedValue(item)
    }
    function checkChecked() {
        return settings.featureOpenOnLoad === Features.UUID_GENERATOR_V4 ? true : false;
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
        setList((prevList) => {
            const newList = [newUUIDObj, ...prevList];
            return newList;
        });
    }
    function changeOnLoad(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.checked) {
            settingsStore.setState({ settings: { ...settings, featureOpenOnLoad: Features.UUID_GENERATOR_V4 } })
        } else {
            settingsStore.setState({ settings: { ...settings, featureOpenOnLoad: '' } })
        }
    }
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
                                        <input id='autoCopy' type="checkbox" checked={autoCopy} onChange={(e) => { setAutoCopy(e.target.checked) }} className="checkbox checkbox-md " />
                                        Auto Copy
                                    </label>
                                    <label className="fieldset-label">
                                        <input type="checkbox" checked={checkChecked()} onChange={changeOnLoad} className="checkbox" />
                                        Open on load
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
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
