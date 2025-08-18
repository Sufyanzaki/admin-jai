import {postRequest} from "@/shared-lib";

type Props = {
    pageLink: string;
}

export async function postPageView(props: Props): Promise<{status: string} | undefined> {
    const r = await postRequest<Props>({
        url: `setting/page-view`,
        data: props,
        useAuth: true,
    });
    return r.response;
}