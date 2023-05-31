import { Fragment } from "react";
import Info from "@/components/layout/info/info";
import Mask from "@/components/mask";
import Nya from '@/components/layout/nya/nya';

const Layout = (props: any) => {
  return (
    <Fragment>
      <main className="tart bg-black font-mono">
        <div className="puff p-4 h-auto w-auto overflow-visible relative">
          <div className="clear h-auto ml-auto mr-auto overflow-visible overflow-x-hidden relative shadow-md">
            <div className="bg-gray-900 relative flex flex-nowrap shadow-lg">
              <Info />
              {props.children}
              <Mask />
              <Nya />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default Layout
