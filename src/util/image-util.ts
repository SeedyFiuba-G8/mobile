import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';

export type loadUserImageResult = {
    blob: Blob;
    uri: string;
};

const loadUserImage = async (
    ratio: [number, number],
    width: number,
    height: number
): Promise<loadUserImageResult | undefined> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: ratio,
        quality: 1,
    });

    console.log(result);

    if (result.cancelled) {
        return;
    }

    const blob = await new Promise<Blob>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', result.uri, true);
        xhr.send(null);
    });

    return {
        blob: <Blob>blob,
        uri: result.uri,
    };
};

export { loadUserImage };
