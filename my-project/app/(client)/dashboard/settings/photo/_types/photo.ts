export type PhotoDto = {
    id: string,
    onlyMembersWithPhotoCanSee: boolean,
    onlyVipCanSee: boolean,
    blurForFreeMembers: boolean,
    onRequestOnly: boolean
}