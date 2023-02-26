import * as React from 'react';
import { Toast } from 'flowbite-react/lib/cjs/components/Toast';


export default function App() {
    return (
        <div className="h-screen bg-amber-50 flex grid px-20">
            <div className="row flex flex-wrap items-center gap-2 content-center">
                <div>
                    <button
                        className="drop-shadow-md text-xs hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border  rounded py-2 px-2 border-amber-100 hover:border-amber-400"
                    >
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-md border-2 text-xs bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-2">
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-md border-2 text-xs bg-stone-300 border border-stone-400 rounded hover:bg-stone-400 py-2 px-2 hover:text-white">
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-lg border-2 text-xs border rounded py-2 px-2 bg-stone-600 border-stone-800 hover:bg-stone-800 text-stone-100">
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-lg border-2 text-xs border rounded py-2 px-2 bg-white border-stone-100 hover:bg-stone-200 hover:border-stone-200">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-lg border-2 text-xs border rounded py-2 px-2 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl text-xs border rounded py-2 px-2 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white">
                        Button
                    </button>
                </div>
                <div>
                    <input type="text" placeholder="Text" className="input input-bordered input-info w-full max-w-xs focus:border-sky-400 focus:ring-0" />
                </div>
                <div>
                    <input type="text" placeholder="Text" className="input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0" />
                </div>
                <div>
                    <input type="text" placeholder="Text" className="input input-bordered input-error w-full max-w-xs focus:border-red-400 focus:ring-0" />
                </div>
                <div>
                    <input type="text" placeholder="Text" className="input input-bordered w-full max-w-xs focus:border-stone-400 focus:ring-0" />
                </div>
            </div>
            <div className="row flex flex-wrap items-center gap-2  content-center">
                <div>
                    <button
                        className="drop-shadow-lg text-lg hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
                    >
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-lg border-2 text-lg bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-4">
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-lg border-2 text-lg bg-stone-300 border border-stone-400 rounded hover:bg-stone-400 py-2 px-4 hover:text-white">
                        Button
                    </button>
                </div>

                <div>
                    <button
                        className="drop-shadow-xl border-2 text-lg border rounded py-2 px-4 bg-stone-600 border-stone-800 hover:bg-stone-800 text-stone-100">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-lg border-2 text-lg border rounded py-2 px-4 bg-white border-stone-100 hover:bg-stone-200 hover:border-stone-200">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl border-2 text-lg border rounded py-2 px-4 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl text-lg border rounded py-2 px-4 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white">
                        Button
                    </button>
                </div>
                <div className="btn-group">
                    <button className="btn text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Accepted</button>
                    <button className="btn text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Pending</button>
                    <button className="btn text-white btn-info hover:bg-gradient-to-r hover:from-sky-100 hover:to-sky-200 hover:border-sky-200 hover:text-black">Blocked</button>
                </div>
                <div>
                    <button className="btn btn-circle hover:bg-stone-800 hover:border-stone-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24"><path d="m21.707 20.293-3.388-3.388A7.942 7.942 0 0 0 20 12.021h-2a5.95 5.95 0 0 1-1.109 3.456l-1.452-1.452c.348-.591.561-1.27.561-2.004v-6C16 3.804 14.215 2 12.021 2c-.07 0-.14.009-.209.025A4.005 4.005 0 0 0 8 6.021v.565L3.707 2.293 2.293 3.707l18 18 1.414-1.414zM10 6.021c0-1.103.897-2 2-2a.918.918 0 0 0 .164-.015C13.188 4.08 14 4.956 14 6.021v6c0 .172-.029.335-.071.494L10 8.586V6.021zm-4 6H4c0 4.072 3.06 7.436 7 7.931v2.069h2v-2.07a7.993 7.993 0 0 0 2.218-.611l-1.558-1.558a5.979 5.979 0 0 1-1.66.239c-3.309 0-6-2.692-6-6z"></path><path d="M8.011 12.132a3.993 3.993 0 0 0 3.877 3.877l-3.877-3.877z"></path></svg>
                    </button>
                </div>
                <div>
                    <button className="btn btn-circle btn-error hover:bg-red-600 hover:border-red-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="16" height="16" viewBox="0 0 24 24" ><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z"></path><path d="M15.292 7.295 12 10.587 8.708 7.295 7.294 8.709l3.292 3.292-3.292 3.292 1.414 1.414L12 13.415l3.292 3.292 1.414-1.414-3.292-3.292 3.292-3.292z"></path></svg>
                    </button>
                </div>
                <div>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                    </label>
                </div>
                <div>
                    <label className="relative inline-flex items-center mr-5 cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                    </label>
                </div>
                <div>
                    <button className="btn gap-2">
                        Inbox
                        <div className="badge badge-secondary">+99</div>
                    </button>
                </div>
                <div className="indicator">
                    <span className="indicator-item badge badge-secondary">99+</span>
                    <button className="btn">inbox</button>
                </div>
            </div>
            <div className="row flex flex-wrap items-center gap-2  content-center">
                <div>
                    <button
                        className="drop-shadow-lg text-3xl hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border border-amber-100 hover:border-amber-400 rounded py-2 px-4 "
                    >
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-lg border-2 text-3xl bg-amber-200 border border-amber-300 rounded hover:bg-amber-300 py-2 px-4">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-lg border-2 text-3xl bg-stone-300 border border-stone-400 rounded hover:bg-stone-400 py-2 px-4 hover:text-white">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl border-2 text-3xl border rounded py-2 px-4 bg-stone-600 border-stone-800 hover:bg-stone-800 text-stone-100">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-lg border-2 text-3xl border rounded py-2 px-4 bg-white border-stone-100 hover:bg-stone-200 hover:border-stone-200">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl border-2 text-3xl border rounded py-2 px-4 bg-red-300 hover:bg-red-400 border-red-300 hover:text-white hover:border-red-400">
                        Button
                    </button>
                </div>
                <div>
                    <button
                        className="drop-shadow-xl text-3xl border rounded py-2.5 px-4 bg-sky-100 hover:bg-gradient-to-r hover:from-sky-300 hover:to-sky-400 hover:border-sky-300 border-sky-100 hover:text-white">
                        Button
                    </button>
                </div>

            </div>
            <div className="row flex flex-wrap items-center gap-2 content-center">
                <div>
                    <Toast>
                        <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-amber-300">
                        </div>
                        <div className="ml-3 text-black text-xs">
                            <p>Filter </p>
                        </div>
                        <Toast.Toggle />
                    </Toast>
                </div>
                <div>
                    <Toast>
                        <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-red-300">
                        </div>
                        <div className="ml-3 text-black text-xs ">
                            <p>Filter </p>
                        </div>
                        <Toast.Toggle />
                    </Toast>
                </div>
                <div>
                    <Toast>
                        <div className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-lg bg-sky-300">
                        </div>
                        <div className="ml-3 text-black text-xs">
                            <p>Filter</p>
                        </div>
                        <Toast.Toggle />
                    </Toast>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-md" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-xs" />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-md checkbox-error" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-error" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-xs checkbox-error" />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-md checkbox-info" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-info" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-xs checkbox-info" />
                    </label>
                </div>

                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-md checkbox-warning" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-sm checkbox-warning" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="focus:ring-0 focus:ring-offset-0 checkbox checkbox-xs checkbox-warning" />
                    </label>
                </div>
                <div>
                    <label htmlFor="my-modal-4" className="btn">Dialogue Box</label>
                    <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                    <label htmlFor="my-modal-4" className="modal cursor-pointer">
                        <label className="modal-box relative" htmlFor="">
                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        </label>
                    </label>
                </div>
                <div>
                    <label htmlFor="my-modal-3" className="btn">Dialogue Box</label>
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box relative">
                            <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="my-modal" className="btn">Dialogue Box</label>
                    <input type="checkbox" id="my-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
                            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal" className="btn">Yay!</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row flex flex-wrap items-center gap-2 content-center">
            <ul className="block menu menu-horizontal bg-base-100 w-30">
                <li tabindex="0">
                  <span className="text-xs">Graduation Year</span>
                  <ul>
                    <div className="bg-base-100">
                      <form >
                        <input type="text" placeholder="2023" class="text-xs input input-bordered input-warning w-full max-w-xs focus:border-amber-400 focus:ring-0"></input>
                        <div>
                          <br></br>
                          <button className="drop-shadow-md text-xs hover:bg-gradient-to-r hover:from-amber-400 hover:to-amber-500 bg-amber-100 border  rounded py-2 px-2 border-amber-100 hover:border-amber-400">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>

                  </ul>
                </li>
              </ul>
            </div>

        </div>
    )
}
