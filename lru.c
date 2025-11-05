#include <stdio.h>

int main() {
    int n, f, i, j, k, page_fault = 0;
    printf("Enter number of pages: ");
    scanf("%d", &n);
    int pages[n];
    printf("Enter page reference string:\n");
    for (i = 0; i < n; i++) scanf("%d", &pages[i]);

    printf("Enter number of frames: ");
    scanf("%d", &f);
    int frames[f], counter[f];
    for (i = 0; i < f; i++) {
        frames[i] = -1;
        counter[i] = 0;
    }

    int time = 0;
    for (i = 0; i < n; i++) {
        int flag = 0, pos, min = 9999;
        for (j = 0; j < f; j++) {
            if (frames[j] == pages[i]) {
                flag = 1;
                counter[j] = ++time;
                break;
            }
        }
        if (flag == 0) {
            for (j = 0; j < f; j++) {
                if (frames[j] == -1) {
                    frames[j] = pages[i];
                    counter[j] = ++time;
                    flag = 1;
                    break;
                }
            }
        }
        if (flag == 0) {
            for (j = 0; j < f; j++) {
                if (counter[j] < min) {
                    min = counter[j];
                    pos = j;
                }
            }
            frames[pos] = pages[i];
            counter[pos] = ++time;
            page_fault++;
        } else if (flag == 1 && i >= f) {
            page_fault++;
        }

        printf("\nFor page %d: ", pages[i]);
        for (k = 0; k < f; k++) {
            if (frames[k] != -1) printf("%d ", frames[k]);
            else printf("- ");
        }
    }

    printf("\nTotal Page Faults = %d\n", page_fault);
    return 0;
}