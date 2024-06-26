import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModel: () => void;
  title?: string;
  children?: ReactNode;
}
export default function Model({ isOpen, closeModel, title, children }: IProps) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModel}
          // __demoMode
        >
          <div
            className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm"
            aria-hidden="true"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-3 shadow-md">
                  {title && (
                    <DialogTitle
                      as="h3"
                      className="text-base/7 font-medium text-black text-center font-bold"
                    >
                      {title}
                    </DialogTitle>
                  )}
                  <div className="mt-4">{children}</div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
