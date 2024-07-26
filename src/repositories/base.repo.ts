import { useApiClient } from "../utils/api.utils";
import notification from "../utils/notification.util";

class BaseRepo {
  protected client = useApiClient();

  public notifySuccess(message: string) {
    notification.success(message);
  }

  public notifyError(message: string) {
    notification.error(message);
  }

  public async delete(url: string) {
    return this.client.delete(url);
  }
}

export default BaseRepo;