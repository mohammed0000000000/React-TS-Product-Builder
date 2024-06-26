import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
interface IProp {
  isOpen: boolean;
  open: () => void;
  children?: ReactNode;
}
const DialogComponent = ({ isOpen, open, children }: IProp) => {
  return (
    <>
      {/* <Button
        onClick={open}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Open dialog
      </Button> */}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full shadow-md max-w-md rounded-xl bg-white p-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black"
              >
                Are you sure to remove this product from your store ?
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-black">
                Deleting this product will reomve it permanently from your
                inventory. Any associated data, sales history, and other related
                information will also be deleted. Please make sure this is the
                intended action.
              </p>
              <div className="mt-4">
                {/* <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-black shadow-inner shadow-white/50 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Got it, thanks!
                </Button> */}
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default DialogComponent;
