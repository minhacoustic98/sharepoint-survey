import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { LogLevel, PnPLogging } from "@pnp/logging";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/batching";
import "@pnp/sp/items";
import "@pnp/sp/lists";
import "@pnp/sp/site-users/web";
import "@pnp/sp/webs";
// eslint-disable-next-line no-var
var _sp: SPFI = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (context != null) {
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp;
};
