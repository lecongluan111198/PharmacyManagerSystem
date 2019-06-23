/*
 * Created by BeoHoang (hoangdanan98@gmail.com)
 * Created at 6/20/19 3:58 PM
 *
 */

import {User, UserRole} from "@/types/User";
import {RawRule, Rule} from "@casl/ability";
import {Thuoc} from "@/types/Thuoc";
import {HoaDon} from "@/types/HoaDon";

export const rulesOf = (user: User): RawRule[] => {
    switch (+user.role) {
        case UserRole.ADMIN:
            return [
                {
                    subject: 'all',
                    actions: ['manage', 'read', 'write'],
                }
            ];
        case UserRole.SALE:
            return [
                {
                    subject: "HoaDon",
                    actions: ['manage', 'read', 'write'],
                    conditions: {
                        created_by_id: user.id,
                    },
                },
                {
                    subject: "Thuoc",
                    actions: ['manage', 'read', 'write'],
                }
            ];
        case UserRole.STORAGE_MANAGER:
            return [
                {
                    subject: ['Thuoc', 'Kho'],
                    actions: ['manage', 'read', 'write'],
                },
                {
                    subject: "Receipt",
                    actions: ['manage', 'read', 'write'],
                },
            ];
        case UserRole.TAG_MANAGER:
            return [
                {
                    subject: ["Provider", "Category"],
                    actions: ['manage', 'read', 'write'],
                },
            ];
        default:
            return [];
    }
};
